import { Ctx } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { startTransaction } from "db/transaction"
import { PrismaDbType } from "types"
import { CreateTransactionSchema, CreateTransactionType } from "../schemas"
import { NotificationsTransactionType } from "src/core/notifications/NotificationsTransaction"

export const createTransactionDbQuery = async (
  input: CreateTransactionType,
  ctx: Ctx,
  $db: PrismaDbType,
  notifications: NotificationsTransactionType
) => {
  const transaction = await $db.transaction.create({ data: { ...input } })
  return transaction
}

export default resolver.pipe(
  resolver.zod(CreateTransactionSchema),
  resolver.authorize(),
  async (input, ctx) => {
    return startTransaction(createTransactionDbQuery, input, ctx)
  }
)
