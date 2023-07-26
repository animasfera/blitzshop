import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import axios from "axios"
import { DateTime } from "luxon"

const GetFxrate = z.object({
  // This accepts type of undefined, but is required at runtime
  from: z.string(),
  to: z.string(),
})

export default resolver.pipe(resolver.zod(GetFxrate), async ({ from, to }) => {
  if (from === to) {
    return 1
  }
  const fxrate = await db.fxRate.findUnique({
    where: {
      from_to: { from, to },
    },
  })

  let diffHours = 0
  if (fxrate) {
    const now = DateTime.now()
    const rateUpdatedAt = DateTime.fromJSDate(fxrate.updatedAt)
    diffHours = now.diff(rateUpdatedAt, "hours").toObject().hours as number
  }

  if (!fxrate || (diffHours && diffHours > 24)) {
    let res: any
    try {
      res = await axios.get(`https://api.apilayer.com/fixer/latest?symbols=${to}&base=${from}`, {
        headers: {
          apikey: process.env.FXRATE_API_KEY || "",
        },
      })
    } catch (e) {
      console.log(e)
    }

    const data = res.data

    if (data && data.rates && data.rates[to]) {
      await db.fxRate.upsert({
        where: {
          from_to: { from, to },
        },
        update: {
          rate: data.rates[to],
        },
        create: {
          from,
          to,
          rate: data.rates[to],
        },
      })
      return data.rates[to] as number
    } else {
      throw new Error("Currency converter is unavailable")
    }
  }

  return fxrate.rate as number
})
