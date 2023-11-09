import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateOrderSchema, UpdateOrderSchemaType } from "../schemas"
import { OrderStatusEnum, UserRoleEnum } from "@prisma/client"
import { AuthorizationError, Ctx, NotFoundError } from "blitz"
import { PrismaDbType } from "../../../types"
import { NotificationsTransactionType } from "../../core/notifications/NotificationsTransaction"
import { startTransaction } from "../../../db/transaction"

export const updateOrderDbQuery = async (
  input: UpdateOrderSchemaType,
  ctx: Ctx,
  $db: PrismaDbType,
  notifications: NotificationsTransactionType
) => {
  if (!ctx.session.$isAuthorized(UserRoleEnum.ADMIN)) {
    throw new AuthorizationError()
  }

  const { id, ...rest } = input

  const order = await db.order.findUnique({ where: { id } })
  if (!order) {
    throw new NotFoundError(`Order #${id} not found`)
  }
  const orderUpdated = await db.order.update({ where: { id }, data: input })
  if (input.status && input.status !== orderUpdated.status) {
    switch (orderUpdated.status) {
      case OrderStatusEnum.SHIPPED:
        break
      case OrderStatusEnum.PROCESSING:
        break
    }
  }

  return order
}

export default resolver.pipe(
  resolver.zod(UpdateOrderSchema),
  resolver.authorize(),
  async (input, ctx) => {
    return startTransaction(updateOrderDbQuery, input, ctx)
  }
)
