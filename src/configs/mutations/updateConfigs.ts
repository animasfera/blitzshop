import { resolver } from "@blitzjs/rpc"
import db from "db"

export default resolver.pipe(resolver.authorize(), async ({ configs: configsUpdatedData }, ctx) => {
  let transactions = [] as any

  for (var key in configsUpdatedData) {

    let value = "" + configsUpdatedData[key]
    if (value === "true") {
      value = "1"
    } else if (value === "false") {
      value = "0"
    }
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
