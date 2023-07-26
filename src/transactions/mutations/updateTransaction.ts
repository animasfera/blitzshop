import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateTransactionSchema, UpdateTransactionType } from "../schemas"

import { cancelTransactionDbQuery } from "./cancelTransaction"
import { failTransactionDbQuery } from "./failTransaction"
import { initTransactionServiceDbQuery } from "./initTransaction"
import { finalizeTransactionServiceDbQuery } from "./finalizeTransactionService"

export const updateTransactionDbQuery = async (input: UpdateTransactionType, ctx, $db) => {
  const { id, data, ...rest } = input

  const transaction = await $db.transaction.findUnique({
    where: { id },
    include: {
      invoice: true,
    },
  })
  if (!transaction) {
    throw new NotFoundError()
  }

  // 1. Update transaction
  const transactionUpdated = await $db.transaction.update({
    where: {
      id,
    },
    data: {
      ...rest,
    },
  })

  // 2. Update status separately
  if (data.status) {
    const statusMutations = {
      canceled: cancelTransactionDbQuery,
      failed: failTransactionDbQuery,
      paying: initTransactionServiceDbQuery,
      finished: finalizeTransactionServiceDbQuery,
    }

    if (statusMutations[data.status]) {
      await statusMutations[data.status]({ id, ...rest }, ctx, $db)
    } else {
      throw new Error("Incorrect status")
    }
  }

  return transactionUpdated
}

export default resolver.pipe(resolver.zod(UpdateTransactionSchema), async (input, ctx) => {
  // @ts-ignore
  return await db.$transaction(async ($db) => {
    return updateTransactionDbQuery(input, ctx, $db)
  })
})
