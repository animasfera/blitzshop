import { Ctx } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { PrismaDbType } from "types"

import { CreateTransactionSchema, CreateTransactionType } from "../schemas"

export const createTransactionDbQuery = async (
  input: CreateTransactionType,
  ctx: Ctx,
  $db: PrismaDbType
) => {
  const transaction = await $db.transaction.create({ data: { ...input } })
  return transaction
}

export default resolver.pipe(
  resolver.zod(CreateTransactionSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const transaction = await db.transaction.create({ data: input })

    return transaction
  }
)
