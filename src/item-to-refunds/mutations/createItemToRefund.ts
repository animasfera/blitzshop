import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateItemToRefundSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateItemToRefundSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const itemToRefund = await db.itemToRefund.create({ data: input })

    return itemToRefund
  }
)
