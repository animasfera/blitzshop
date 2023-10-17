import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UserRole } from "@prisma/client"
import { z } from "zod"
import { PrismaDbType } from "types"
import { startTransaction } from "../../../../db/transaction"
import { createStripePaymentIntentDbQuery } from "./createStripePaymentIntent"
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const CreateStripeRefund = z.object({
  amount: z.number(),
  remoteTransactionId: z.number(),
  localTransactionId: z.number().optional(),
})

export const createStripeRefundDbQuery = async (input, ctx, $db: PrismaDbType) => {
  const { amount, remoteTransactionId, localTransactionId } = input

  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

  const refund = await stripe.refunds.create({
    payment_intent: remoteTransactionId,
    amount: amount * 100, // Multiply by 100 because Stripe accepts Int amounts in cents
    metadata: {
      transactionId: localTransactionId,
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
