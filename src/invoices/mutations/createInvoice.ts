import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"
import { PrismaDbType } from "types"

import { CreateInvoiceSchema } from "../schemas"
import { InvoiceStatusEnum, Prisma, UserRoleEnum } from "@prisma/client"
import { AuthorizationError, NotFoundError } from "blitz"
import getFxRate from "../../fx-rates/queries/getFxRate"

type CreateInvoiceType = z.infer<typeof CreateInvoiceSchema>

export const createInvoiceDbQuery = async (data: CreateInvoiceType, ctx, $db: PrismaDbType) => {
  // START TRANSACTION
  // const {orderId, ...restInvoice}
  // const order = await db.order.findUnique({where: {
  //   id: orderId
  // }})
  // if(!order){
  //   throw new NotFoundError()
  // }
  //
  // if(order.userId !== ctx.session.userId && !ctx.session.$isAuthorized(UserRoleEnum.ADMIN)){
  //   throw new AuthorizationError()
  // }
  // const amount = getFxRate, { from: "EUR", to: restInvoice.currency }
  //
  // let invoiceData = {
  //   amount:
  // }
  // invoice: {
  //   create: {
  //     amount: rest.total,
  //       status: InvoiceStatusEnum.PENDING,
  //       currency,
  //   },
  // },
  //
  //
  // let invoiceData = { ...data.invoice } as Prisma.InvoiceCreateInput
  // return $db.invoice.create({ data: invoiceData })
  // // END TRANSACTION
}

export default resolver.pipe(
  resolver.zod(CreateInvoiceSchema),
  resolver.authorize(),
  async (input, ctx) => {
    // @ts-ignore
    return await db.$transaction(async ($db) => {
      return createInvoiceDbQuery(input, ctx, $db)
    })
  }
)
