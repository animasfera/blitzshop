import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { Prisma, TransactionStatusEnum } from "@prisma/client"
import db from "db"
import { TransactionModel } from "db/zod"
import { PrismaDbType } from "types"

import { doError } from "src/core/errors/Errors"
import { TransactionErrors } from "../errors"

export const finalizeTransactionDbQuery = async (
  { id, remoteTransactionId }: { id: number; remoteTransactionId?: string | null },
  ctx,
  $db: PrismaDbType
) => {
  // START TRANSACTION
  const transaction = await $db.transaction.findUnique({
    where: { id },
  })

  if (!transaction) {
    throw new NotFoundError()
  }

  if (
    remoteTransactionId &&
    transaction.remoteTransactionId &&
    remoteTransactionId !== transaction.remoteTransactionId
  ) {
    console.log(remoteTransactionId)
    console.log(transaction.remoteTransactionId)
    throw await doError(TransactionErrors.remoteTransactionIdIncorrect)
  }

  const statusNotValidForFinishing =
    transaction.status !== TransactionStatusEnum.PAYING &&
    transaction.status !== TransactionStatusEnum.PENDING

  if (statusNotValidForFinishing) {
    throw new Error(
      `Транзакция не может быть завершена, т.к. ее статус равен '${transaction.status}'`
    )
  }

  let data = {
    lastUpdated: { increment: 1 },
    status: TransactionStatusEnum.FINISHED,
  } as Prisma.TransactionUpdateInput

  if (remoteTransactionId) {
    data.remoteTransactionId = remoteTransactionId + "" // To string conversion
  }

  const transactionRes = await $db.transaction.update({
    where: {
      /*
      id_lastUpdated: {
        id: transaction.id,
        lastUpdated: transaction.lastUpdated,
      },
      */
      id: transaction.id,
    },
    data,
  })

  if (!transactionRes) {
    throw new Error("Данные изменились")
  }

  console.log("transactionRes updated")

  return transactionRes
  // END TRANSACTION
}

export default resolver.pipe(
  resolver.zod(TransactionModel.pick({ id: true })),
  resolver.authorize(),
  async ({ id }, ctx) => {
    // @ts-ignore
    return await db.$transaction(async ($db) => {
      return await finalizeTransactionDbQuery({ id }, ctx, $db)
    })
  }
)
