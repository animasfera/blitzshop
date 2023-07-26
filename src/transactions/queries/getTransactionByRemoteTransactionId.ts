import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { NotFoundError } from "blitz"

const GetTransaction = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.string(),
})

export const getTransactionByRemoteTransactionIdDbQuery = async (input, ctx, PrismaDbType) => {
  const { id } = input

  const transaction = await db.transaction.findFirst({
    where: { remoteTransactionId: id },
    include: {
      amount: true,
      feeTotal: true,
      invoice: true,
      net: true,
      paymentMethod: true,
      user: true,
    },
  })

  if (!transaction) throw new NotFoundError()

  return transaction
}

export default resolver.pipe(
  resolver.zod(GetTransaction),
  resolver.authorize(),
  async ({ id }, ctx) => {
    // @ts-ignore
    return await db.$transaction(async ($db) => {
      return await getTransactionByRemoteTransactionIdDbQuery({ id }, ctx, $db)
    })
  }
)
