import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateTransactionSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateTransactionSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const transaction = await db.transaction.create({ data: input })

    return transaction
  }
)
