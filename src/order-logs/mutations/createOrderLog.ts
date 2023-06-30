import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateOrderLogSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateOrderLogSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const orderLog = await db.orderLog.create({ data: input })

    return orderLog
  }
)
