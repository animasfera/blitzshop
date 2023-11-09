import { Ctx, NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { TransactionStatusEnum } from "@prisma/client"
import db from "db"
import { z } from "zod"

import { handleCpApiError } from "src/core/cloudpayments/handleCpApiError"
import { cpGetTransactionByLocalTransactionId } from "src/cloudpayments-api/cpGetTransactionByInvoice"
import { finalizeTransactionServiceDbQuery } from "../mutations/finalizeTransactionService"

import { PrismaDbType } from "types"

const SyncTransaction = z.object({
  id: z.number(),
})

export const syncTransactionWithRemoteDbQuery = async (
  { id }: { id: number },
  ctx: Ctx,
  $db: PrismaDbType
) => {
  const transaction = await $db.transaction.findUnique({ where: { id } })

  if (!transaction) {
    throw new NotFoundError()
  }

  console.log("Начата синхронизация транзакции ID=" + transaction.id)

  // TODO important sync only transactions that are remote! There could be transactions created manually that doesn't have to be synced

  if (
    transaction.status === TransactionStatusEnum.PENDING ||
    transaction.status === TransactionStatusEnum.PAYING
  ) {
    // IF pending transactions for this payment order are found,
    // try to find the related transaction on the remote server and update the status
    // of local transaction.
    // If no remote transactions are found, mark local transaction as failed and exit from the
    // job. The payment order will be restarted later again by cron job

    // TODO important add the same for Stripe!

    await cpGetTransactionByLocalTransactionId({ id: transaction.id })
      .then(async (response) => {
        console.log(`Received response from the remote server`)
        console.log(response.data)
        console.log(response.data.Success)
        console.log(response.data.Message)
        console.log(response.data.Model.length)

        const asyncTransaction = response.data.Model
        const data = JSON.parse(asyncTransaction.JsonData)
        const responseHasNoTransaction = !asyncTransaction

        if (!asyncTransaction) {
          let error =
            "Transaction was not received by the remote server. Failing local transaction."
          console.error(error)
          throw new Error(error)
        }

        switch (asyncTransaction.Status) {
          case "Authorized":
            if (transaction.status === TransactionStatusEnum.PENDING) {
            }
            break
          case "Completed":
            let totalFee
            if (asyncTransaction.TotalFee) {
              totalFee = Number(asyncTransaction.TotalFee)
            }
            await finalizeTransactionServiceDbQuery(
              { id: transaction.id, remoteTransactionId: asyncTransaction.TransactionId },
              ctx,
              $db
            )
            break
          case "Canceled":
            break
          case "Declined":
            break
          default:
            null
        }
      })
      .catch(handleCpApiError)
  }
}

export default resolver.pipe(
  resolver.zod(SyncTransaction),
  resolver.authorize(),
  async ({ id }, ctx) => {
    // @ts-ignore
    return await db.$transaction(async ($db) => {
      return await syncTransactionWithRemoteDbQuery({ id }, ctx, $db)
    })
  }
)
