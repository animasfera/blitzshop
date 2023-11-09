import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { Ctx } from "blitz"
import { TransactionModel } from "db/zod"
import { CurrencyEnum, TransactionTypeEnum } from "@prisma/client"
import db from "db"
import { PrismaDbType } from "types"
import { cpCreateRefund } from "src/cloudpayments-api/cpCreateRefund"
import { handleCpApiResponse } from "src/core/cloudpayments/handleCpApiResponse"
import { handleCpApiError } from "src/core/cloudpayments/handleCpApiError"
import { syncTransactionWithRemoteDbQuery } from "./syncTransactionWithRemote"
import failTransaction from "./failTransaction"

export const startPaymentOnTransactionDbQuery = async (
  { id }: { id: number },
  ctx: Ctx,
  $db: PrismaDbType
) => {
  console.log("startPaymentOnTransactionDbQuery")

  // TODO Check that transaction is synced before continue to the next step
  await syncTransactionWithRemoteDbQuery({ id }, ctx, $db)

  // const transaction = await $db.transaction.findFirst({
  //   where: { id },
  //   include: {
  //     /*
  //     paymentMethodDetail: {
  //       include: {
  //         moneyAccount: true,
  //         paymentMethod: true,
  //         cardToken: true,
  //         bankProfile: true,
  //       },
  //     },
  //     */
  //     user: true,
  //     paymentMethod: true,
  //     invoice: true,
  //     amount: true,
  //   },
  // })
  // if (!transaction) {
  //   throw new NotFoundError()
  // }
  // let {
  //   // paymentMethodDetail,
  //   user,
  //   ...transactionUpdated
  // } = transaction
  //
  // if (
  //   transaction.type !== TransactionTypeEnum.REFUND
  //   // && transaction.type !== TransactionType.payout
  // ) {
  //   throw new Error(
  //     `Can't start transferring money on transaction ID#${id} because its type is not refund/payout`
  //   )
  // }
  // if (
  //   // ???
  //   // transaction.type === TransactionType.payout &&
  //   // transaction.paymentMethodDetail?.paymentMethod.automaticPayout === false
  //   transaction.paymentMethod.name
  // ) {
  //   throw new Error(
  //     `Can't start automatic money transfer for transaction ID#${id} - the payment method is manual`
  //   )
  // }
  //
  // switch (transaction.type) {
  //   case TransactionTypeEnum.REFUND:
  //     if (!transaction.invoiceId) {
  //       throw new Error(
  //         `Can't start transferring money on transaction ID#${id} because there's no invoice`
  //       )
  //     }
  //
  //     const invoice = await $db.invoice.findFirst({
  //       where: { id: transaction.invoiceId },
  //       include: {
  //         originalInvoice: {
  //           select: {
  //             transactions: { where: { type: TransactionTypeEnum.SALE }, take: 1 },
  //           },
  //         },
  //         transactions: true,
  //         order: { include: { refunds: true } },
  //         parentItem: true,
  //
  //         /*
  //         receiver: true,
  //         refund: {
  //           select: {
  //             id: true,
  //             slotId: true,
  //           },
  //         },
  //         */
  //       },
  //     })
  //
  //     if (!invoice) {
  //       throw new NotFoundError()
  //     }
  //     if (!invoice.order.refunds) {
  //       throw new Error("К инвоису не привязан refund")
  //     }
  //
  //     const saleTransaction = invoice.originalInvoice?.transactions[0]
  //
  //     /*
  //     if (!transaction.paymentMethodName) {
  //       throw new Error("Can't do refund - payment method is unknown")
  //     }
  //     */
  //     if (
  //       // transaction.paymentMethodName === PaymentMethodName.stripe &&
  //       transaction.amount.currency === CurrencyEnum.RUB
  //     ) {
  //       throw new Error("Can't do refund - RUB currency is not supported by stripe")
  //     }
  //     if (
  //       // transaction.paymentMethodName === PaymentMethodName.cloudpayments &&
  //       // transaction.currency !== Currency.RUB
  //       transaction.amount.currency === CurrencyEnum.USD
  //     ) {
  //       throw new Error(
  //         `Can't do refund - ${transaction.amount.currency} is not supported by cloudpayments`
  //       )
  //     }
  //
  //     if (!saleTransaction) {
  //       throw new Error("Невозможно запустить возврат - нет транзакции продажи")
  //     }
  //     if (!saleTransaction.remoteTransactionId) {
  //       throw new Error("Невозможно запустить возврат - нет номера удаленной транзакции")
  //     }
  //     // TODO important check if original invoice has enough money for refund
  //
  //     const refundPaymentMethods = {
  //       stripe: async () => {
  //         console.log("Starting REFUND")
  //         const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
  //         const refund = await stripe.refunds.create({
  //           payment_intent: saleTransaction.remoteTransactionId,
  //           amount: transaction.amount.amount,
  //           metadata: {
  //             originalTransactionId: saleTransaction.id,
  //             transactionId: transaction.id,
  //           },
  //         })
  //         if (refund && refund.data) {
  //           if (refund.data.error) {
  //             await failTransaction(
  //               { id: transaction.id, failReason: refund.data.error.message },
  //               ctx
  //             )
  //           } else {
  //             await initTransaction(
  //               { id: transaction.id, remoteTransactionId: refund.data.data.id },
  //               ctx
  //             )
  //           }
  //         }
  //         return refund
  //       },
  //       cloudpayments: async () => {
  //         if (process.env.NODE_ENV !== "test") {
  //           return cpCreateRefund({
  //             transactionId: saleTransaction.remoteTransactionId!,
  //             amount: Math.abs(transaction.amount.amount),
  //             jsonData: {
  //               transactionId: transaction.id,
  //               // refundId: invoice.order.refunds!.id,
  //             },
  //           })
  //             .then(async (response) => {
  //               await handleCpApiResponse(response, transaction, ctx)
  //             })
  //             .catch(handleCpApiError)
  //         }
  //       },
  //     }
  //
  //     /*
  //     const doRefundOperation = refundPaymentMethods[transaction.paymentMethodName]
  //     await doRefundOperation()
  //     */
  //
  //     break
  //
  //   // PAYOUT
  //   // case TransactionTypeEnum.payout:
  //   // @ts-ignore
  //   case TransactionTypeEnum.MANUAL_ADJUSTMENT:
  //     console.log("Starting PAYOUT")
  //
  //     /*
  //     if (!transaction.payoutReportId) {
  //       throw new Error("No transaction.payoutReportId")
  //     }
  //     if (!transaction.paymentMethodDetail) {
  //       throw new Error(`Transaction ID${id} - no payment method is defined`)
  //     }
  //     */
  //
  //     /*
  //     const payoutReport = await $db.payoutReport.findFirst({
  //       where: { id: transaction.payoutReportId },
  //       include: {
  //         user: true,
  //         transactions: true,
  //         businessEntity: true,
  //       },
  //     })
  //
  //     if (!payoutReport) throw new NotFoundError()
  //
  //
  //     const paymentMethods = {
  //       stripe: () => {
  //         // Stripe can't do payouts. Will do this via other channels manually
  //       },
  //       cloudpayments: async () => {
  //         if (!transaction.paymentMethodDetail?.cardToken) {
  //           throw new Error("No card token provided for payout")
  //         }
  //         if (!transaction.paymentMethodDetail.moneyAccount) {
  //           throw new Error("No money account")
  //         }
  //         if (transaction.currency !== "RUB") {
  //           throw new Error(
  //             `Can't start payout via cloudpayments - transaction #${transaction.id} currency is not RUB`
  //           )
  //         }
  //
  //         console.log("cpStartPayout")
  //
  //         let payoutReq = await cpStartPayout({
  //           invoiceId: transaction.id,
  //           transactionId: transaction.id,
  //           cardToken: transaction.paymentMethodDetail?.cardToken.token,
  //           amount: Math.abs(transaction.net / 100),
  //           jsonData: {},
  //           userId: payoutReport.userId,
  //           moneyAccount: transaction.paymentMethodDetail.moneyAccount,
  //           businessEntity: payoutReport.businessEntity,
  //         })
  //           .then(async (response) => {
  //             await handleCpApiResponse(response, transaction, ctx)
  //           })
  //           .catch(handleCpApiError)
  //
  //         console.log(payoutReq)
  //       },
  //     }
  //
  //     const doPayoutOperation = paymentMethods[transaction.paymentMethodDetail?.paymentMethod.name]
  //     await doPayoutOperation()
  //     */
  //
  //     break
  //   default:
  //     null
  // }

  // return transactionUpdated
  return true
}

export default resolver.pipe(
  resolver.zod(TransactionModel.pick({ id: true })),
  // TODO change!!!
  resolver.authorize(),
  async ({ id }, ctx) => {
    // @ts-ignore
    return await db.$transaction(async ($db) => {
      return await startPaymentOnTransactionDbQuery({ id }, ctx, $db)
    })
  }
)
