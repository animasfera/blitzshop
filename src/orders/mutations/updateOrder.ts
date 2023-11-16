import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateOrderSchema, UpdateOrderSchemaType } from "../schemas"
import { OrderStatusEnum, Prisma, UserRoleEnum } from "@prisma/client"
import { AuthorizationError, Ctx, NotFoundError } from "blitz"
import { PrismaDbType } from "../../../types"
import { NotificationsTransactionType } from "../../core/notifications/NotificationsTransaction"
import { startTransaction } from "../../../db/transaction"
import { orderShippedMailer } from "mailers/orderShippedMailer"
import { orderProcessingMailer } from "mailers/orderProcessingMailer"
import { orderPendingMailer } from "mailers/orderPendingMailer"
import { orderAwaitingPaymentMailer } from "mailers/orderAwaitingPaymentMailer"

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
  let data = { ...rest } as Prisma.OrderUpdateInput
  if (data.shippingFee && typeof data.shippingFee === "number") {
    data.total = order.subtotal + data.shippingFee
  }
  if (input.status) {
    data.log = {
      create: {
        status: input.status,
      },
    }
  }
  const orderUpdated = await db.order.update({ where: { id }, data })
  if (input.status && order.status !== orderUpdated.status) {
    switch (orderUpdated.status) {
      case OrderStatusEnum.SHIPPED:
        notifications.add({
          channels: ["email"],
          userId: order.userId,
          data: orderShippedMailer({ order: orderUpdated }),
        })
        break
      case OrderStatusEnum.PROCESSING:
        notifications.add({
          channels: ["email"],
          userId: order.userId,
          data: orderProcessingMailer({ order: orderUpdated }),
        })
        break
      case OrderStatusEnum.PENDING:
        notifications.add({
          channels: ["email"],
          userId: order.userId,
          data: orderPendingMailer({ order: orderUpdated }),
        })
        break
      case OrderStatusEnum.PAYMENT:
        notifications.add({
          channels: ["email"],
          userId: order.userId,
          data: orderAwaitingPaymentMailer({ order: orderUpdated }),
        })
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
