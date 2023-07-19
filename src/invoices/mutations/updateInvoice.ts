import { resolver } from "@blitzjs/rpc"
import { Ctx, NotFoundError } from "blitz"
import { UpdateInvoiceSchema, UpdateInvoiceType } from "../schemas"
import { InvoiceStatusEnum, TransactionStatusEnum } from "@prisma/client"
import db from "db"

export const updateInvoiceDbQuery = async ({ id, ...data }: UpdateInvoiceType, ctx: Ctx, $db) => {
  const payment = await $db.invoice.findUnique({
    where: { id },
    include: {
      transactions: true,
      booking: {
        select: { id: true },
      },
      refund: {
        select: { id: true },
      },
    },
  })
  const cantFinalizeErrorMsg = `Can't update payment #${id} -`

  if (!payment) {
    throw new NotFoundError()
  }

  if (data.data.status && data.data.status !== payment.status) {
    switch (data.data.status) {
      case InvoiceStatusEnum.PENDING:
        throw new Error(`${cantFinalizeErrorMsg} - trying to set incorrect status`)
      case InvoiceStatusEnum.PARTIALLY_PAID:
        if (payment.status !== InvoiceStatusEnum.PENDING) {
          throw new Error(`${cantFinalizeErrorMsg} - trying to set incorrect status`)
        }
        break
      case InvoiceStatusEnum.FAILED:
        if (
          payment.status !== InvoiceStatusEnum.PARTIALLY_PAID &&
          payment.status !== InvoiceStatusEnum.PENDING
        ) {
          throw new Error(`${cantFinalizeErrorMsg} - trying to set incorrect status`)
        }
        const activeTransaction = payment.transactions.find(
          (transaction) =>
            transaction.status === TransactionStatusEnum.FINISHED ||
            transaction.status === TransactionStatusEnum.PAYING ||
            transaction.status === TransactionStatusEnum.PENDING
        )
        if (activeTransaction) {
          throw new Error(`Can't cancel payment because there are active or paid transactions`)
        }
        break
      case InvoiceStatusEnum.PARTIALLY_PAID:
        if (
          payment.status !== InvoiceStatusEnum.PARTIALLY_PAID &&
          payment.status !== InvoiceStatusEnum.PENDING
        ) {
          throw new Error(`${cantFinalizeErrorMsg} - trying to set incorrect status`)
        }
        if (!payment.transactions || payment.transactions.length === 0) {
          throw new Error(`${cantFinalizeErrorMsg} no transactions are found`)
        }
        const finishedTransaction = payment.transactions.find(
          (transaction) => transaction.status === TransactionStatusEnum.FINISHED
        )
        if (!finishedTransaction) {
          throw new Error(`${cantFinalizeErrorMsg} there's no finished transaction`)
        }
        break
      case InvoiceStatusEnum.FAILED:
        if (
          payment.status !== InvoiceStatusEnum.PENDING &&
          payment.status !== InvoiceStatusEnum.PARTIALLY_PAID
        ) {
          throw new Error(`${cantFinalizeErrorMsg} - trying to set incorrect status`)
        }
        break
      default:
        break
    }
  }

  // 1. Finalize payment
  const paymentUpdateResult = await $db.invoice.updateMany({
    where: {
      id: payment.id,
      // lastUpdated: payment.lastUpdated,
    },
    data: {
      // lastUpdated: { increment: 1 },
      status: InvoiceStatusEnum.PARTIALLY_PAID,
    },
  })
  if (!paymentUpdateResult.count) {
    throw new Error("Can't update payment - the data has changed")
  }

  return await $db.invoice.findUnique({ where: { id } })
}

export default resolver.pipe(
  resolver.zod(UpdateInvoiceSchema),
  resolver.authorize(),
  async (input, ctx) => {
    // @ts-ignore
    return await db.$transaction(async ($db) => {
      return await updateInvoiceDbQuery(input, ctx, $db)
    })
  }
)
