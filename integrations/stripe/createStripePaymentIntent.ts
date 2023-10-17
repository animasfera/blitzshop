import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { PrismaDbType } from "types"
import { PaymentIntent } from "@stripe/stripe-js"
import { NotFoundError } from "blitz"
import { initTransactionServiceDbQuery } from "../../../transactions/mutations/initTransaction"
import { startTransaction } from "../../../../db/transaction"
import { cancelTransactionDbQuery } from "../../../transactions/mutations/cancelTransaction"
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const CreateStripePaymentIntent = z.object({
  slotId: z.number(),
  numTickets: z.number(),
  currency: z.enum(["EUR"]),
  metadata: z
    .object({
      transactionId: z.number().optional(),
    })
    .optional(),
})

export const createStripePaymentIntentDbQuery = async (input, ctx, $db: PrismaDbType) => {
  const { slotId, numTickets, metadata, currency } = input

  const slot = await db.slot.findUnique({
    where: {
      id: slotId,
    },
  })
  if (!slot) {
    throw new NotFoundError()
  }

  const amount = slot.price * numTickets

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
