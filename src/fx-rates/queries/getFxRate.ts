import { resolver } from "@blitzjs/rpc"
import db, { CurrencyEnum } from "db"
import { z } from "zod"
import axios from "axios"
import { DateTime } from "luxon"

/*
const VALUES = ["Salmon", "Tuna", "Trout"] as const;
const FishEnum = z.enum(VALUES);
*/

// const Currencies = Object.values(CurrencyEnum)

const GetFxrate = z.object({
  from: z.string(),
  to: z.string(),
})

export default resolver.pipe(resolver.zod(GetFxrate), async ({ from, to }) => {
  if (from === to) {
    return 1
  }

  // await db.fxRate.deleteMany({})

  const fxrate = await db.fxRate.findUnique({
    where: { from_to: { from, to } },
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
      await fetch("https://www.cbr-xml-daily.ru/daily_json.js")
        .then(async (response) => {
          const result = await response.json()

          if (to === CurrencyEnum.RUB) {
            res = result.Valute[`${from}`].Value
          } else if (from === CurrencyEnum.RUB) {
            res = result.Valute[`${to}`].Value / 10000
          } else {
            res = result.Valute[`${from}`].Value / result.Valute[`${to}`].Value
          }
        })
        .catch((err) => console.error(err))
    } catch (error) {
      console.error(error)
    }

    const data = res * 1.01

    if (data) {
      await db.fxRate.upsert({
        where: {
          from_to: { from, to },
        },
        update: {
          rate: data,
        },
        create: {
          from,
          to,
          rate: data,
        },
      })

      return data as number
    } else {
      console.error("Currency converter is unavailable")
      throw new Error("Currency converter is unavailable")
    }
  }

  return fxrate?.rate ?? 1 // as number
})
