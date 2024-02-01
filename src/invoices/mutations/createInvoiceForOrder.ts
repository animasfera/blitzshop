import { AuthorizationError, NotFoundError } from "blitz"
import { Ctx } from "@blitzjs/next"
import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db, { Invoice, InvoiceStatusEnum, Prisma, UserRoleEnum } from "db"
import { PrismaDbType } from "types"

import { CreateInvoiceForOrderSchema } from "../schemas"
import getFxRate from "src/fx-rates/queries/getFxRate"

type CreateInvoiceForOrderType = z.infer<typeof CreateInvoiceForOrderSchema>

export const createInvoiceForOrderDbQuery = async (
  data: CreateInvoiceForOrderType,
  ctx: Ctx,
  $db: PrismaDbType
): Promise<Invoice> => {
  const { orderId, ...restInvoice } = data
  const order = await $db.order.findUnique({ where: { id: orderId } })

  /*
  await db.cartToItem.deleteMany({ where: { cartId } })
  await db.cart.update({
    where: { id: cartId },
    data: { numItems: 0 },
  })
  */

  if (!order) throw new NotFoundError(`Order with ID: ${order} not found`)

  if (order.userId !== ctx.session.userId && !ctx.session.$isAuthorized(UserRoleEnum.ADMIN)) {
    throw new AuthorizationError()
  }
  const fxRate = await getFxRate({ from: "EUR", to: restInvoice.currency }, ctx)

  let invoiceData = {
    amount: Math.round(order.total * fxRate),
    status: InvoiceStatusEnum.PENDING,
    currency: restInvoice.currency,
    order: { connect: { id: order.id } },
  } as Prisma.InvoiceCreateInput

  const invoice = await $db.invoice.create({ data: invoiceData })

  return invoice
}

export default resolver.pipe(
  resolver.zod(CreateInvoiceForOrderSchema),
  resolver.authorize(),
  async (input, ctx) => {
    return await db.$transaction(async ($db) => {
      return await createInvoiceForOrderDbQuery(input, ctx, $db)
    })
  }
)
