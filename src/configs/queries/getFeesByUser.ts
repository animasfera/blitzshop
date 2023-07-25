import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetConfig = z.object({
  userId: z.number(),
})

export default resolver.pipe(resolver.zod(GetConfig), async ({ userId }, ctx) => {
  const config = await db.config.findMany({
    where: {
      key: {
        in: ["feeSaleCoef", "feeBankRuFixed", "feeBankRuCoef", "feeSwiftCoef", "feeSwiftFixed"],
      },
    },
  })

  let _config = {} as {
    feeSaleCoef: number
    feeTotalCoef: number
    feeBankRuCoef: number
    feeBankRuFixed: number
    feeSwiftCoef: number
    feeSwiftFixed: number
  }
  config.forEach((cfg) => {
    if (cfg.value !== null) {
      _config[cfg.key] = parseFloat(cfg.value)
    }
  })

  /*
  const customFee = await db.customFee.findFirst({ where: { user: { id: userId } } })
  if (customFee) {
    _config.feeSaleCoef = customFee.feeSaleCoef
  }
  */

  return _config
})
