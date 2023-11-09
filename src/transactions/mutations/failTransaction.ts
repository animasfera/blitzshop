import { resolver } from "@blitzjs/rpc"
import db from "db"
import { InvoiceStatusEnum, TransactionStatusEnum } from "@prisma/client"
import { z } from "zod"
import { PrismaDbType } from "types"

const FailTransaction = z.object({
  id: z.number(),
  failReason: z.string().optional(),
  failReasonCode: z.number().optional(),
})

type FailTransactionType = z.infer<typeof FailTransaction>

export const failTransactionDbQuery = async (
  input: FailTransactionType,
  ctx,
  $db: PrismaDbType
) => {
  const { id, failReason, failReasonCode } = input

  let invalidateCard = false

  const transaction = await $db.transaction.findUnique({
    where: { id },
    include: {
      /*
      invoice: { include: { receiver: true } },
      payoutReport: { include: { user: true } },
      paymentMethodDetail: {
        include: {
          paymentMethod: true,
          cardToken: true,
          bankProfile: true,
        },
      },
      */
      invoice: true,
      paymentMethod: true,
    },
  })

  if (!transaction) {
    throw new Error("Некорректная транзакция")
  }

  const transactionData = {
    status: TransactionStatusEnum.FAILED,
    failReason: failReason,
    failReasonCode: failReasonCode || 0,
  } as any

  const _transaction = await $db.transaction.update({
    where: { id },
    data: transactionData,
  })

  // Fail related refund payment order if it's final fail
  console.log("Need to invalidate invoice?")

  if (
    transaction.invoice &&
    transaction.invoice.id &&
    failReason === "Превышена максимальная сумма возврата"
  ) {
    console.log("Yes, need to invalidate invoice")
    console.log(transaction)
    const updateInvoice = await $db.invoice.update({
      where: { id: transaction.invoice.id },
      data: {
        // status: PaymentStatus.failed,
        status: InvoiceStatusEnum.CANCELLED,
      },
    })
  }

  // If doing payout, invalidate card token
  /*
  if (transaction.type === TransactionType.payout) {
    // TODO check if card must be invalidated?
    if (
      transaction.paymentMethodDetail?.paymentMethod.name === PaymentMethodName.cloudpayments &&
      transaction.paymentMethodDetail?.cardToken
    ) {
      const invalidateCardToken = $db.cardToken.update({
        where: { id: transaction.paymentMethodDetail?.cardToken?.id },
        data: {
          valid: false,
          invalidReason: failReason,
        },
      })
    }
    invalidateCard = true

    if (transaction.paymentMethodDetail?.paymentMethod.type === PaymentMethodType.bank) {
      const invalidateCardToken = $db.bankProfile.update({
        where: { id: transaction.paymentMethodDetail?.bankProfile?.id },
        data: {
          valid: false,
          invalidReason: failReason,
        },
      })
    }
  }
  */

  // Send mail to payment receiver about invalidated card
  // TODO send notification about failed transaction and about invalidated payment method details
  if (
    _transaction &&
    // transaction.type === TransactionType.payout &&
    invalidateCard
    // && transaction.payoutReport
  ) {
    /*
    await payoutCardIsInvalidMailer({
      user: transaction.payoutReport.user,
    }).send()
    */
  }

  return _transaction
}

export default resolver.pipe(
  resolver.zod(FailTransaction),
  resolver.authorize(),
  async (input, ctx) => {
    // @ts-ignore
    return await db.$transaction(async ($db) => {
      return await failTransactionDbQuery(input, ctx, $db)
    })
  }
)
