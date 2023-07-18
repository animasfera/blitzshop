import { resolver } from "@blitzjs/rpc"
import { Ctx } from "blitz"
import db from "db"
import { TransactionModel } from "db/zod"
// import { PlatformBalanceTransactionType } from "@prisma/client"
import { PrismaDbType } from "types"

// import { createPlatformBalanceTransactionDbQuery } from "src/platform-balance-transactions/mutations/createPlatformBalanceTransaction"
// import { finalizeInvoiceServiceDbQuery } from "src/invoices/services/finalizeInvoiceService"
import { finalizeTransactionDbQuery } from "../mutations/finalizeTransaction"
// import { finalizePayoutReportServiceDbQuery } from "src/payout-reports/mutations/finalizeReportService"
// import { createFinalizedTransactionDbQuery } from "../mutations/createFinalizedTransaction"

export const finalizeTransactionServiceDbQuery = async (
  { id, remoteTransactionId }: { id: number; remoteTransactionId?: string | null },
  ctx: Ctx,
  $db: PrismaDbType
) => {
  console.log("doing finalizeTransactionServiceDbQuery")

  // 1. Finalize transaction
  const finalizedTransaction = await finalizeTransactionDbQuery(
    { id, remoteTransactionId },
    ctx,
    $db
  )

  /*
  // 2. Create finalized fee transaction on platform's balance
  if (finalizedTransaction.feeTotal && finalizedTransaction.feeType) {
    const platformTransaction = await createPlatformBalanceTransactionDbQuery(
      {
        currency: finalizedTransaction.currency,
        amount: finalizedTransaction.feeTotal,
        // type: PlatformBalanceTransactionType[finalizedTransaction.feeType],
        userTransactionId: finalizedTransaction.id,
      },
      ctx,
      $db
    )
  }
  if (finalizedTransaction.userBalanceFeeTotal && finalizedTransaction.userBalanceFeeType) {
    const transactionFee = await createFinalizedTransactionDbQuery(
      {
        currency: finalizedTransaction.currency,
        moneyAccountId: finalizedTransaction.moneyAccountId,
        slotId: finalizedTransaction.slotId,
        amount: finalizedTransaction.userBalanceFeeTotal,
        net: finalizedTransaction.userBalanceFeeTotal,
        type: finalizedTransaction.userBalanceFeeType,
        userId: finalizedTransaction.userId,
      },
      ctx,
      $db
    )
  }

  // 3. Finalize invoice
  console.log("will finalize invoice with ID = " + finalizedTransaction.invoiceId)

  if (finalizedTransaction.invoiceId) {
    console.log("yes will")
    const finalizedInvoice = await finalizeInvoiceServiceDbQuery(
      { id: finalizedTransaction.invoiceId },
      ctx,
      $db
    )

    // 4. OR finalize payout
  } else if (finalizedTransaction && finalizedTransaction.payoutReportId) {
    const finalizedPayout = await finalizePayoutReportServiceDbQuery(
      { id: finalizedTransaction.payoutReportId },
      ctx,
      $db
    )
  }
  */

  return finalizedTransaction
}

export default resolver.pipe(
  resolver.zod(TransactionModel.pick({ id: true, remoteTransactionId: true })),
  resolver.authorize(),
  async ({ id, remoteTransactionId }, ctx) => {
    // @ts-ignore
    return await db.$transaction(async ($db) => {
      console.log("will do finalizeTransactionServiceDbQuery")

      if (remoteTransactionId) {
        remoteTransactionId = remoteTransactionId + ""
      }

      return await finalizeTransactionServiceDbQuery({ id, remoteTransactionId }, ctx, $db)
    })
  }
)
