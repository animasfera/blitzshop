import { resolver } from "@blitzjs/rpc"
import { Ctx } from "blitz"
import { TransactionStatusEnum } from "@prisma/client"
import db from "db"
import { PrismaDbType } from "types"

import { CreateTransactionSchema, CreateTransactionType } from "../schemas"

export const createFinalizedTransactionDbQuery = async (
  input: CreateTransactionType,
  ctx: Ctx,
  $db: PrismaDbType
) => {
  const { userId } = input

  const transaction = await $db.transaction.update({
    include: {
      amount: true,
      feeTotal: true,
      invoice: true,
      net: true,
      paymentMethod: true,
      user: true,
    },
    where: {
      id: userId,
    },
    data: {
      status: TransactionStatusEnum.FINISHED,
    },
  })
  return transaction
}

export default resolver.pipe(
  resolver.zod(CreateTransactionSchema),
  resolver.authorize(),
  async (input, ctx) => {
    // @ts-ignore
    return await db.$transaction(async ($db) => {
      return await createFinalizedTransactionDbQuery(input, ctx, $db)
    })
  }
)
