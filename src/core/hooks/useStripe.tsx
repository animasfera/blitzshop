import { StripeCheckoutForm } from "src/core/stripe/components/StripeCheckoutForm"
import { loadStripe, PaymentIntent } from "@stripe/stripe-js"
import React, { useMemo, useState } from "react"
import { Elements } from "@stripe/react-stripe-js"
import createStripePaymentIntent from "../stripe/mutations/createStripePaymentIntent"
import { useMutation } from "@blitzjs/rpc"
import { OrderWithItemsAndUserAndInvoice } from "./useCloudpayments"
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || "")

export const StripeCheckoutFormWithElements = ({ orderId, paymentIntentInstance }) => {
  if (!paymentIntentInstance) {
    return <></>
  }

  return (
    <Elements
      options={{
        clientSecret: paymentIntentInstance.client_secret || "",
        appearance: {
          theme: "stripe" as "stripe",
        },
      }}
      stripe={stripePromise}
    >
      <StripeCheckoutForm orderId={orderId} />
    </Elements>
  )
}

export const useStripe = () => {
  const [paymentIntentInstance, setPaymentIntentInstance] = useState<PaymentIntent | null>(null)
  const [createPaymentIntentMutation] = useMutation(createStripePaymentIntent)

  let options
  useMemo(() => {
    if (paymentIntentInstance) {
      options = {
        clientSecret: paymentIntentInstance.client_secret,
        appearance: {
          theme: "stripe" as "stripe",
        },
      }
    }
  }, [paymentIntentInstance])

  return {
    pay: async (order: OrderWithItemsAndUserAndInvoice) => {
      if (!order.invoices[0]) {
        return
      }

      const paymentIntent = await createPaymentIntentMutation({
        amount: order.invoices[0].amount / 100,
        currency: "EUR",
        metadata: {
          invoiceId: order.invoices[0].id,
        },
      })
      return paymentIntent
      // setPaymentIntentInstance(paymentIntent)
    },
    paymentIntent: paymentIntentInstance,
    CheckoutForm: ({ orderId }: { orderId: number }) => {
      return <CheckoutForm orderId={orderId} paymentIntentInstance={paymentIntentInstance} />
    },
  }
}
