import React, { useMemo, useState } from "react"
import { useMutation } from "@blitzjs/rpc"
import { loadStripe, PaymentIntent } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { CurrencyEnum, Invoice } from "db"

import { StripeCheckoutForm } from "src/core/stripe/components/StripeCheckoutForm"
import createStripePaymentIntent from "src/core/stripe/mutations/createStripePaymentIntent"
import cleanCart from "src/carts/mutations/cleanCart"
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
  const [cleanCartMutation] = useMutation(cleanCart)

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
    pay: async (invoice: Invoice) => {
      if (invoice.currency !== CurrencyEnum.EUR) {
        return false
      }
      const paymentIntent = await createPaymentIntentMutation({
        amount: invoice.amount,
        currency: "EUR",
        metadata: {
          invoiceId: invoice.id,
        },
      })

      // очищаем корзину при успешной оплате
      await cleanCartMutation({})

      // setPaymentIntentInstance(paymentIntent)
      return paymentIntent
    },
    paymentIntent: paymentIntentInstance,
  }
}
