import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateOrderLogSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateOrderLogSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const orderLog = await db.orderLog.update({ where: { id }, data })

    return orderLog
  }
)
