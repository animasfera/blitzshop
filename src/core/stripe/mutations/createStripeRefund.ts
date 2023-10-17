import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import { PrismaDbType } from "types"
import { startTransaction } from "../../../../db/transaction"

const CreateStripeRefund = z.object({
  amount: z.number(),
  remoteTransactionId: z.number(),
  invoiceId: z.number().optional(),
})

export const createStripeRefundDbQuery = async (input, ctx, $db: PrismaDbType) => {
  const { amount, remoteTransactionId, invoiceId } = input

  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

  const refund = await stripe.refunds.create({
    payment_intent: remoteTransactionId,
    amount: amount, // Multiply by 100 because Stripe accepts Int amounts in cents
    metadata: {
      invoiceId: invoiceId,
    },
  })

  return refund
}

export default resolver.pipe(
  resolver.zod(CreateStripeRefund),
  resolver.authorize(),
  async (input, ctx) => {
    return await startTransaction(createStripeRefundDbQuery, input, ctx)
  }
)
