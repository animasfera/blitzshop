import { Ctx } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { startTransaction } from "db/transaction"
import { PrismaDbType } from "types"
import { CreateTransactionSchema, CreateTransactionType } from "../schemas"
import { NotificationsTransactionType } from "src/core/notifications/NotificationsTransaction"
import { createTransactionDbQuery } from "./createTransaction"
import { InvoiceStatusEnum, TransactionStatusEnum } from "@prisma/client"
import { updateInvoiceDbQuery } from "../../invoices/mutations/updateInvoice"
import { sum } from "../../core/helpers/Helpers"

export const createTransactionServiceDbQuery = async (
  input: CreateTransactionType,
  ctx: Ctx,
  $db: PrismaDbType,
  notifications: NotificationsTransactionType
) => {
  const transaction = await createTransactionDbQuery(input, ctx, $db, notifications)
  if (transaction.status === TransactionStatusEnum.FINISHED) {
    if (transaction.invoiceId) {
      const invoice = await $db.invoice.findUnique({
        where: { id: transaction.invoiceId },
        include: {
          transactions: {
            select: {
              amount: true,
            },
          },
        },
      })
      if (!invoice) {
        throw new Error(`Invoice #${transaction.invoiceId} not found`)
      }
      let sumOfTransactions = sum(invoice.transactions, "amount")
      console.log("sumOfTransactions")
      console.log(sumOfTransactions)
      console.log(invoice.amount)
      console.log(sumOfTransactions === invoice.amount)
      let needToChangeInvoiceStatusTo: null | InvoiceStatusEnum = null
      if (sumOfTransactions === invoice.amount) {
        needToChangeInvoiceStatusTo = InvoiceStatusEnum.PAID
      } else if (invoice.status === InvoiceStatusEnum.PENDING) {
        needToChangeInvoiceStatusTo = InvoiceStatusEnum.PARTIALLY_PAID
      }
      if (needToChangeInvoiceStatusTo) {
        const invoice = await updateInvoiceDbQuery(
          { id: transaction.invoiceId, status: needToChangeInvoiceStatusTo },
          ctx,
          $db,
          notifications
        )
      }
    }
  }
  return transaction
}

export default resolver.pipe(
  resolver.zod(CreateTransactionSchema),
  resolver.authorize(),
  async (input, ctx) => {
    return startTransaction(createTransactionServiceDbQuery, input, ctx)
  }
)
