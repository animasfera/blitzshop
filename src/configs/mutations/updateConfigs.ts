import { resolver } from "@blitzjs/rpc"
import db from "db"

export default resolver.pipe(resolver.authorize(), async ({ configs: configsUpdatedData }, ctx) => {
  let transactions = [] as any

  for (var key in configsUpdatedData) {
    const value = "" + configsUpdatedData[key]
    transactions.push(
      db.config.upsert({
        where: { key: key },
        update: { value: value },
        create: { key: key, value: value },
      })
    )
  }
  return await db.$transaction(transactions)
})
