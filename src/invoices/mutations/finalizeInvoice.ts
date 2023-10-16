import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { InvoiceStatusEnum, TransactionStatusEnum } from "@prisma/client"
import db from "db"
import { PrismaDbType } from "types"

import { UpdateInvoiceSchema } from "../schemas"

export const finalizeInvoiceDbQuery = async ({ id }, ctx, $db: PrismaDbType) => {
  // START TRANSACTION
  const invoice = await $db.invoice.findUnique({
    where: { id },
    include: {
      transactions: true,
    },
  })
  const cantFinalizeErrorMsg = `Can't finalize invoice #${id} -`

  if (!invoice) {
    throw new NotFoundError()
  }
  console.log("invoice was found again")

  if (
    invoice.status !== InvoiceStatusEnum.PARTIALLY_PAID &&
    invoice.status !== InvoiceStatusEnum.PENDING
  ) {
    throw new Error(`${cantFinalizeErrorMsg} no transactions are found`)
  }

  if (!invoice.transactions || invoice.transactions.length === 0) {
    throw new Error(`${cantFinalizeErrorMsg} no transactions are found`)
  }

  const finishedTransaction = invoice.transactions.find(
    (transaction) => transaction.status === TransactionStatusEnum.FINISHED
  )
  if (!finishedTransaction) {
    throw new Error(`${cantFinalizeErrorMsg} there's no finished transaction`)
  }

  // 1. Finalize invoice
  const invoiceUpdateResult = await $db.invoice.updateMany({
    where: {
      id: invoice.id,
      // lastUpdated: invoice.lastUpdated,
    },
    data: {
      // lastUpdated: { increment: 1 },
      status: InvoiceStatusEnum.PARTIALLY_PAID,
    },
  })
  if (!invoiceUpdateResult.count) {
    throw new Error("Can't update invoice - the data has changed")
  }

  const invoiceUpdated = await $db.invoice.findUnique({
    where: { id },
    include: {
      creditNotes: true,
      order: true,
      originalInvoice: true,
      parentItem: true,
      paymentMethod: true,
      transactions: true,
    },
  })
  return invoiceUpdated
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
      return await finalizeInvoiceDbQuery({ id }, ctx, $db)
    })
  }
)
