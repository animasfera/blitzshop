import { useStripe } from "./useStripe"
import { OrderWithItemsAndUserAndInvoice, useCloudpayments } from "./useCloudpayments"
import { useState } from "react"
import { CurrencyEnum } from "@prisma/client"

export const usePayment = () => {
  const stripe = useStripe()
  const cloudpayments = useCloudpayments()
  const [stripePaymentIntent, setStripePaymentIntent] = useState<any>()
  const pay = async (order: OrderWithItemsAndUserAndInvoice) => {
    if (!order.invoice) {
      return false
    }
    switch (order.invoice.currency) {
      case CurrencyEnum.RUB:
        cloudpayments.pay(order)
        break
      case CurrencyEnum.EUR:
        const paymentIntent = await stripe.pay(order)
        setStripePaymentIntent(paymentIntent)
        break
    }
  }

  return {
    pay,
    cloudpayments,
    stripe,
    stripePaymentIntent,
  }
}
