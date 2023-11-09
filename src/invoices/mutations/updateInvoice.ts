import { resolver } from "@blitzjs/rpc"
import { Ctx, NotFoundError } from "blitz"
import { UpdateInvoiceSchema, UpdateInvoiceType } from "../schemas"
import { InvoiceStatusEnum, OrderStatusEnum, TransactionStatusEnum } from "@prisma/client"
import { startTransaction } from "db/transaction"
import { NotificationsTransactionType } from "src/core/notifications/NotificationsTransaction"
import { sum } from "src/core/helpers/Helpers"
import { updateOrderDbQuery } from "src/orders/mutations/updateOrder"
import { PrismaDbType } from "../../../types"

export const updateInvoiceDbQuery = async (
  input: UpdateInvoiceType,
  ctx: Ctx,
  $db: PrismaDbType,
  notifications: NotificationsTransactionType
) => {
  const { id, ...data } = input
  const invoice = await $db.invoice.findUnique({
    where: { id },
    include: {
      transactions: true,
      refund: {
        select: { id: true },
      },
    },
  })
  const cantFinalizeErrorMsg = `Can't update invoice #${id} -`

  if (!invoice) {
    throw new NotFoundError()
  }

  let changingStatus = false
  if (data.status && data.status !== invoice.status) {
    changingStatus = true
    switch (data.status) {
      case InvoiceStatusEnum.PENDING:
        throw new Error(`${cantFinalizeErrorMsg} - trying to set incorrect status`)
      case InvoiceStatusEnum.PARTIALLY_PAID:
        if (invoice.status !== InvoiceStatusEnum.PENDING) {
          throw new Error(`${cantFinalizeErrorMsg} - trying to set incorrect status`)
        }
        break
      case InvoiceStatusEnum.PAID:
        if (
          invoice.status !== InvoiceStatusEnum.PARTIALLY_PAID &&
          invoice.status !== InvoiceStatusEnum.PENDING
        ) {
          throw new Error(`${cantFinalizeErrorMsg} - trying to set incorrect status`)
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
        if (invoice.transactions.length === 0) {
          throw new Error("Невозможно завершить инвоис тк нет успешно завершенных транзакций")
        }
        const sumOfTransactions = sum(invoice.transactions, "amount")
        if (Math.abs(sumOfTransactions) < invoice.amount) {
          throw new Error(
            "Can't finalize invoice - sum amount of transactions is less than invoice amount"
          )
        }

        break
      case InvoiceStatusEnum.CANCELLED:
        if (
          invoice.status !== InvoiceStatusEnum.PENDING &&
          invoice.status !== InvoiceStatusEnum.PARTIALLY_PAID
        ) {
          throw new Error(`${cantFinalizeErrorMsg} - trying to set incorrect status`)
        }
        break
      default:
        break
    }
  }

  const invoiceUpdated = await $db.invoice.update({
    where: {
      id: invoice.id,
    },
    data: {
      status: data.status,
    },
    include: {
      transactions: {
        where: {
          status: TransactionStatusEnum.FINISHED,
        },
      },
      order: true,
      refund: true,
      originalInvoice: true,
    },
  })
  if (!invoiceUpdated) {
    throw new Error("Couldn't update invoice")
  }

  if (changingStatus) {
    switch (invoiceUpdated.status) {
      case InvoiceStatusEnum.PAID:
        if (invoiceUpdated.refund) {
          // TODO do refund
          // const refund = await updateRefundDbQuery({ id: invoiceToFinalize.refund.id }, ctx, $db)
        } else if (invoiceUpdated.order) {
          const booking = await updateOrderDbQuery(
            { id: invoiceUpdated.order.id, status: OrderStatusEnum.PROCESSING },
            ctx,
            $db,
            notifications
          )
        }
        break
    }
  }

  return await $db.invoice.findUnique({ where: { id } })
}

export default resolver.pipe(
  resolver.zod(UpdateInvoiceSchema),
  resolver.authorize(),
  async (input, ctx) => {
    return startTransaction(updateInvoiceDbQuery, input, ctx)
  }
)
