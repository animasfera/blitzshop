import { Ctx } from "@blitzjs/next"
import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"
import { PrismaDbType } from "types"

import { CreateInvoiceForOrderSchema, CreateInvoiceSchema } from "../schemas"
import { Invoice, InvoiceStatusEnum, Prisma, UserRoleEnum } from "@prisma/client"
import { AuthorizationError, NotFoundError } from "blitz"
import getFxRate from "../../fx-rates/queries/getFxRate"
import CreateInvoice from "./createInvoice"

type CreateInvoiceForOrderType = z.infer<typeof CreateInvoiceForOrderSchema>

export const createInvoiceForOrderDbQuery = async (
  data: CreateInvoiceForOrderType,
  ctx: Ctx,
  $db: PrismaDbType
) => {
  const { orderId, ...restInvoice } = data
  const order = await db.order.findUnique({
    where: {
      id: orderId,
    },
  })
  if (!order) {
    throw new NotFoundError()
  }

  if (order.userId !== ctx.session.userId && !ctx.session.$isAuthorized(UserRoleEnum.ADMIN)) {
    throw new AuthorizationError()
  }
  const fxRate = await getFxRate({ from: "EUR", to: restInvoice.currency }, ctx)

  let invoiceData = {
    amount: Math.round(order.total * fxRate),
    status: InvoiceStatusEnum.PENDING,
    currency: restInvoice.currency,
    order: {
      connect: {
        id: order.id,
      },
    },
  } as Prisma.InvoiceCreateInput

  return $db.invoice.create({ data: invoiceData })
}

export default resolver.pipe(
  resolver.zod(CreateInvoiceForOrderSchema),
  resolver.authorize(),
  async (input, ctx) => {
    // @ts-ignore
    return await db.$transaction(async ($db) => {
      return await createInvoiceForOrderDbQuery(input, ctx, $db)
    })
  }
)
