import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { TransactionStatusEnum } from "@prisma/client"
import db from "db"
import { PrismaDbType } from "types"
import { UpdateInvoiceSchema } from "../schemas"

import { finalizeInvoiceDbQuery } from "../mutations/finalizeInvoice"
import { sum } from "src/core/helpers/Helpers"

export const finalizeInvoiceServiceDbQuery = async ({ id }, ctx, $db: PrismaDbType) => {
  console.log("finalizing invoice id=" + id)

  const invoiceToFinalize = await $db.invoice.findUnique({
    where: { id },
    include: {
      transactions: {
        where: {
          status: TransactionStatusEnum.FINISHED,
        },
      },
      order: true,
      originalInvoice: true,
      amount: true,
      // booking: { select: { id: true } },
      // refund: { select: { id: true } },
    },
  })
  if (!invoiceToFinalize) {
    throw new NotFoundError()
  }
  console.log("invoice was found")
  if (invoiceToFinalize.transactions.length === 0) {
    throw new Error("Невозможно завершить инвоис тк нет успешно завершенных транзакций")
  }

  const sumOfTranasctions = sum(invoiceToFinalize.transactions, "amount")
  if (Math.abs(sumOfTranasctions) < invoiceToFinalize.amount.amount) {
    throw new Error(
      "Can't finalize invoice - sum amount of transactions is less than invoice amount"
    )
  }

  const invoice = await finalizeInvoiceDbQuery({ id }, ctx, $db)

  // 3. Finalize parent objects
  /*
  switch (invoiceToFinalize.type) {
    case PaymentType.refund:
      if (invoiceToFinalize.refund?.id) {
        const refund = await finalizeRefundServiceDbQuery(
          { id: invoiceToFinalize.refund?.id },
          ctx,
          $db
        )
      }
      break
    case PaymentType.sale:
      if (invoiceToFinalize.booking?.id) {
        const booking = await finalizeBookingServiceDbQuery(
          { id: invoiceToFinalize.booking?.id },
          ctx,
          $db
        )
      }
      break
  }
  */

  return invoice
}

export default resolver.pipe(
  resolver.zod(
    UpdateInvoiceSchema.pick({
      id: true,
    })
  ),
  resolver.authorize(),
  async ({ id }, ctx) => {
    // @ts-ignore
    return await db.$transaction(async ($db) => {
      return await finalizeInvoiceServiceDbQuery({ id }, ctx, $db)
    })
  }
)
