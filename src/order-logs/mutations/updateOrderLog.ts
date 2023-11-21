import { resolver } from "@blitzjs/rpc"
import { AuthenticationError, Ctx, NotFoundError } from "blitz"
import db from "db"
import { UpdateOrderLogSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateOrderLogSchema),
  resolver.authorize(),
  resolver.authorize("ADMIN"),
  async ({ id, ...data }, ctx: Ctx) => {
    const orderLog = await db.orderLog.findFirst({ where: { id } })

    if (!orderLog) {
      throw new NotFoundError()
    }

    if (orderLog?.userId !== ctx.session?.userId) {
      throw new AuthenticationError("Недостаточно прав")
    }

    const orderLogUpdated = await db.orderLog.update({ where: { id }, data })

    return orderLogUpdated
  }
)
