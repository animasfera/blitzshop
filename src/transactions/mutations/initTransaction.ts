import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { TransactionStatusEnum, TransactionTypeEnum } from "@prisma/client"
import db from "db"
import { TransactionModel } from "db/zod"
import { PrismaDbType } from "types"

const InitTransaction = TransactionModel.pick({
  id: true,
  remoteTransactionId: true,
})

export const initTransactionServiceDbQuery = async (
  { id, remoteTransactionId },
  ctx,
  $db: PrismaDbType
) => {
  // START TRANSACTION

  // 1. Find transaction
  const transaction = await $db.transaction.findUnique({
    where: { id },
    include: {
      invoice: {
        include: {
          amount: true,
          order: true,
          originalInvoice: true,
          paymentMethod: true,
        },
      },
    },
  })
  if (!transaction) {
    throw new NotFoundError()
  }

  // 2. If it's sale transaction - block required number of tickets
  if (transaction.type === TransactionTypeEnum.SALE) {
    /*
    if (!transaction.invoice?.booking?.id) {
      throw new Error(
        "Can't init transaction because there's no invoice/booking attached to the transaction"
      )
    }
    */
    /*
    await bookTicketsDbQuery(
      {
        // bookingId: transaction.invoice?.booking?.id
      },
      ctx,
      $db
    )
    */
  }

  // 3. Change transaction status to "paying"
  const transactionUpdated = await $db.transaction.update({
    where: { id },
    data: {
      // remoteTransactionId: remoteTransactionId,
      id: remoteTransactionId,
      status: TransactionStatusEnum.PAYING,
    },
  })

  return transactionUpdated

  // END TRANSACTION
}

export default resolver.pipe(
  resolver.zod(InitTransaction),
  async ({ id, remoteTransactionId }, ctx) => {
    // @ts-ignore
    return await db.$transaction(async ($db) => {
      return await initTransactionServiceDbQuery({ id, remoteTransactionId }, ctx, $db)
    })
  }
)
