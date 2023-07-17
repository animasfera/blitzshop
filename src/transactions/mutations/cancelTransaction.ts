import { resolver } from "@blitzjs/rpc"
import db from "db"
import { TransactionStatusEnum } from "@prisma/client"
import { z } from "zod"
import { NotFoundError } from "blitz"

const CancelTransaction = z.object({
  id: z.number(),
})

type CancelTransactionType = z.infer<typeof CancelTransaction>

export const cancelTransactionDbQuery = async (input: CancelTransactionType, ctx, $db) => {
  const { id } = input

  console.log("Canceling transaction ID=" + id)

  const transaction = await $db.transaction.findUnique({
    where: { id },
    include: {
      invoice: true,
    },
  })

  if (!transaction) {
    throw new NotFoundError()
  }
  const cantBeCanceled =
    transaction.status !== TransactionStatusEnum.PENDING &&
    transaction.status !== TransactionStatusEnum.PAYING
  // && transaction.status !== TransactionStatus.canBeFinished

  if (cantBeCanceled) {
    throw new Error("Transaction can't be canceled")
  }

  const transactionUpdated = await $db.transaction.updateMany({
    where: {
      id,
      lastUpdated: transaction.lastUpdated,
    },
    data: {
      status: TransactionStatusEnum.CANCELED,
    },
  })
  if (!transactionUpdated.count) {
    throw new Error("Data has changed")
  }

  return transactionUpdated
}

export default resolver.pipe(resolver.zod(CancelTransaction), async (input, ctx) => {
  // @ts-ignore
  return await db.$transaction(async ($db) => {
    return await cancelTransactionDbQuery(input, ctx, $db)
  })
})
