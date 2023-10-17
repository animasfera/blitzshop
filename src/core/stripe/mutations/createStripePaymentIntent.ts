import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import { PrismaDbType } from "types"
import { PaymentIntent } from "@stripe/stripe-js"
import { startTransaction } from "db/transaction"
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const CreateStripePaymentIntent = z.object({
  amount: z.number(),
  currency: z.enum(["EUR"]),
  metadata: z
    .object({
      invoiceId: z.number().optional(),
    })
    .optional(),
})

export const createStripePaymentIntentDbQuery = async (input, ctx, $db: PrismaDbType) => {
  const { amount, currency, metadata } = input

  let stripeQuery = {
    amount: amount,
    currency: currency.toLowerCase(),
    metadata: metadata,
  } as any

  if (process.env.NODE_ENV === "test") {
    stripeQuery.payment_method = "pm_card_visa"
  } else {
    stripeQuery.automatic_payment_methods = {
      enabled: true,
    }
  }

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = (await stripe.paymentIntents.create(stripeQuery)) as PaymentIntent

  return paymentIntent
}

export default resolver.pipe(
  resolver.zod(CreateStripePaymentIntent),
  resolver.authorize(),
  async (input, ctx) => {
    return await startTransaction(createStripePaymentIntentDbQuery, input, ctx)
  }
)
