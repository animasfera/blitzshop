import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const UpdateStripePaymentIntent = z.object({
  id: z.string(),
  amount: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdateStripePaymentIntent),
  resolver.authorize(),
  async (input) => {
    const { id, amount } = input

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.update(id, {
      amount: amount,
    })

    return paymentIntent
  }
)
