import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

import { formatConfig } from "src/core/helpers/formatConfig"

interface GetConfigsInput
  extends Pick<Prisma.ConfigFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(async ({ where, orderBy, skip = 0, take = 999 }: GetConfigsInput) => {
  const configs = await db.config.findMany({ where })

  // TODO add types
  let _configs = {} as {
    allowLogin: boolean
    allowAddSlots: boolean
    allowPaidGames: boolean
    allowPaymentsSgd: boolean
    allowPaymentsRub: boolean
    slotDateLimit: Date
    [key: string]: any
  }
  configs.forEach((config) => {
    _configs[config.key] = formatConfig(config)
  })

  return {
    configs: _configs,
  }
})
