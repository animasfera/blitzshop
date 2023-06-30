import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateItemToRefundSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateItemToRefundSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const itemToRefund = await db.itemToRefund.update({ where: { id }, data })

    return itemToRefund
  }
)
