import { resolver } from "@blitzjs/rpc"
import { Ctx, NotFoundError } from "blitz"
import { InvoiceStatusEnum, TransactionTypeEnum, TransactionStatusEnum } from "@prisma/client"
import db from "db"

import { createTransactionDbQuery } from "src/transactions/mutations/createTransaction"
import { StartRefundSchema, StartRefundType } from "../schemas"
import { invoiceHasUnfinishedTransactions } from "../methods/invoiceHasUnfinishedTransactions"
import { PrismaDbType } from "types"

export const startRefundPaymentDbQuery = async (
  { invoice: _invoice }: StartRefundType,
  ctx: Ctx,
  $db: PrismaDbType
) => {
  const invoice = await $db.invoice.findFirst({
    where: { id: _invoice.id },
    include: {
      // receiver: true,
      amount: true,
      transactions: true,
      originalInvoice: {
        select: {
          transactions: {
            where: {
              type: TransactionTypeEnum.SALE,
              status: TransactionStatusEnum.FINISHED,
            },
            take: 1,
          },
        },
      },
      /*
      refund: {
        select: {
          id: true,
          slotId: true,
          refundFeeTotal: true,
        },
      },
      */
    },
  })

  if (!invoice) throw new NotFoundError()
  //InvoiceStatusEnum
  // ?? if (invoice.type !== PaymentType.refund) {
  if (invoice.status !== InvoiceStatusEnum.REFUNDED) {
    throw new Error("Тип платежа не равен 'refund'")
  }
  // !!! нет этого поля в модели
  /*
  if (!invoice.refund) {
    throw new Error("К инвоису не привязан refund")
  }
  */

  if (invoiceHasUnfinishedTransactions(invoice)) {
    throw new Error("Невозможно начать оплату по данному инвоису - есть незавершенные транзакции.")
  }

  const saleTransaction = invoice.originalInvoice?.transactions[0]

  if (!saleTransaction) {
    throw new Error("Невозможно запустить возврат - нет транзакции продажи")
  }
  if (!saleTransaction.remoteTransactionId) {
    throw new Error("Невозможно запустить возврат - нет номера удаленной транзакции")
  }

  /*
  const transactionCreated = await createTransactionDbQuery(
    {
      amount: -invoice.amount,
      net: -(invoice.amount - invoice.refund.refundFeeTotal),
      feeTotal: -invoice.refund.refundFeeTotal,
      feeType: FeeType.saleFeeRefund,
      currency: invoice.currency,
      invoiceId: invoice.id,
      slotId: invoice.refund.slotId,
      type: PaymentType.refund,
      type: TransactionTypeEnum.REFUND,
      userId: invoice.receiverId,
      senderId: invoice.senderId,
      moneyAccountId: saleTransaction.moneyAccountId,
      paymentMethodName: saleTransaction.paymentMethodName,
    },
    ctx,
    $db
  )

  if (!transactionCreated) {
    throw new Error("Не удалось создать транзакцию для рефанда")
  }
  */

  return // transactionCreated
}

export default resolver.pipe(
  resolver.zod(StartRefundSchema),
  async ({ invoice, transaction }, ctx) => {
    // @ts-ignore
    return await db.$transaction(async ($db) => {
      return await startRefundPaymentDbQuery({ invoice, transaction }, ctx, $db)
    })
  }
)
