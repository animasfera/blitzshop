import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { NotFoundError } from "blitz"
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const UpdateStripePaymentIntent = z.object({
  id: z.string(),
  slotId: z.number(),
  numTickets: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdateStripePaymentIntent),
  resolver.authorize(),
  async (input) => {
    const { id, slotId, numTickets } = input

    const slot = await db.slot.findUnique({
      where: {
        id: slotId,
      },
    })
    if (!slot) {
      throw new NotFoundError()
    }

    const amount = slot.price * numTickets

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.update(id, {
      amount: amount,
    })

    return paymentIntent
  }
)
