import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteItemToRefundSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteItemToRefundSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const itemToRefund = await db.itemToRefund.deleteMany({ where: { id } })

    return itemToRefund
  }
)
