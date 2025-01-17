import { getSession } from "@blitzjs/auth"
import { NextApiRequest, NextApiResponse } from "next"
import { TransactionStatusEnum, TransactionTypeEnum, User, UserRoleEnum } from "@prisma/client"
import getRawBody from "raw-body"
import db from "db"
import { api } from "src/blitz-server"
import createTransactionService from "src/transactions/mutations/createTransactionService"

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export default api(async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  let responseData = {} as any

  res.setHeader("Content-Type", "application/json")

  if (req.method !== "POST") {
    res.statusCode = 400
    responseData.success = false
    responseData.message = "Данный API адрес может быть вызван только методом POST"
    res.end(JSON.stringify(responseData))
  }

  const rawBody = await getRawBody(req)
  const sig = req.headers["stripe-signature"]
  let event

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_ENDPOINT_SECRET)
  } catch (err) {
    console.log(err)
    res.statusCode = 400
    res.end(`Webhook Error: ${err.message}`)
    return
  }

  let paymentIntent

  const user = (await db.user.findFirst({ where: { role: UserRoleEnum.ADMIN } })) as User
  const session = await getSession(req, res)
  Object.assign(session.$publicData, {
    userId: user.id,
    id: user.id,
    role: user.role,
    isAdmin: true,
  })

  try {
    // Handle the event
    switch (event.type) {
      case "payment_intent.amount_capturable_updated":
        paymentIntent = event.data.object
        // Then define and call a function to handle the event payment_intent.amount_capturable_updated
        break
      case "payment_intent.canceled":
        paymentIntent = event.data.object
        // Then define and call a function to handle the event payment_intent.canceled
        break
      case "payment_intent.created":
        paymentIntent = event.data.object
        // Then define and call a function to handle the event payment_intent.created
        break
      case "payment_intent.partially_funded":
        paymentIntent = event.data.object
        // Then define and call a function to handle the event payment_intent.partially_funded
        break
      case "payment_intent.payment_failed":
        paymentIntent = event.data.object
        // Then define and call a function to handle the event payment_intent.payment_failed
        break
      case "payment_intent.processing":
        paymentIntent = event.data.object
        // Then define and call a function to handle the event payment_intent.processing
        break
      case "payment_intent.requires_action":
        paymentIntent = event.data.object
        // Then define and call a function to handle the event payment_intent.requires_action
        break
      case "payment_intent.succeeded":
        paymentIntent = event.data.object
        // Then define and call a function to handle the event payment_intent.succeeded
        // const localTransaction = await invokeWithMiddleware(getTransactionByRemoteTransactionId, {id: paymentIntent.id}, {req, res})

        const invoiceId = Number(paymentIntent.metadata.invoiceId)
        const amount = Number(paymentIntent.amount) // amount comes in cents
        const transaction = await createTransactionService(
          {
            amount,
            invoiceId,
            remoteTransactionId: paymentIntent.id,
            type: TransactionTypeEnum.SALE,
            status: TransactionStatusEnum.FINISHED,
          },
          ctx
        )

        if (!transaction) {
          res.statusCode = 500
        }

        break
      case "charge.refund.updated":
        break

      case "charge.refunded":
        const charge = event.data.object
        const paymentIntentId = charge.payment_intent
        if (paymentIntentId) {
          let invoiceId
          let lastRefund

          const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
          const refunds = await stripe.refunds.list({
            charge: charge.id,
          })

          if (refunds && refunds.data) {
            lastRefund = refunds.data.pop()

            invoiceId = lastRefund.metadata.invoiceId ? Number(lastRefund.metadata.invoiceId) : null
            if (!invoiceId) {
              console.error("No transaction ID provided")
              res.statusCode = 500
            } else {
              const amount = -Number(lastRefund.amount) * 100
              const transaction = await createTransactionService(
                {
                  amount,
                  invoiceId,
                  remoteTransactionId: lastRefund.id,
                  type: TransactionTypeEnum.REFUND,
                  status: TransactionStatusEnum.FINISHED,
                },
                ctx
              )

              if (!transaction) {
                res.statusCode = 500
              }
            }
          }
        }

        break
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`)
    }
  } catch (e) {
    console.error(e)
    res.statusCode = 500
  }

  res.end(JSON.stringify(responseData))
})

export const config = {
  api: {
    bodyParser: false,
  },
}
