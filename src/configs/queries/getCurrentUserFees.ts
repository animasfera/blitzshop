import { resolver } from "@blitzjs/rpc"
import db from "db"

export default resolver.pipe(async ({}, ctx) => {
  const config = await db.config.findMany({
    where: {
      key: {
        in: [
          "feeSaleCoef",
          "feeBankRuFixed",
          "feeBankRuCoef",
          "feeSwiftCoef",
          "feeSwiftFixed",
          "feeCardRuTransactionCoef",
          "feeCardRuTransactionFixed",
        ],
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
    feeCardRuTransactionCoef: number
    feeCardRuTransactionFixed: number
  }
  config.forEach((cfg) => {
    if (cfg.value !== null) {
      _config[cfg.key] = parseFloat(cfg.value)
    }
  })

  return _config
})
