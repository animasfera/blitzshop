import { resolver } from "@blitzjs/rpc"
import { AuthenticationError, Ctx } from "blitz"
import db, { UserRoleEnum } from "db"
import { DeleteOrderLogSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteOrderLogSchema),
  resolver.authorize(),
  resolver.authorize("ADMIN"),
  async ({ id }, ctx: Ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const order = await db.orderLog.findFirst({ where: { id } })

    if (order?.userId !== ctx.session?.userId) {
      throw new AuthenticationError("Недостаточно прав")
    }

    const orderLog = await db.orderLog.deleteMany({ where: { id } })

    return orderLog
  }
)
