import { useStripe } from "./useStripe"
import { OrderWithItemsAndUserAndInvoice, useCloudpayments } from "./useCloudpayments"
import { useState } from "react"
import { CurrencyEnum, Invoice } from "@prisma/client"

export const usePayment = () => {
  const stripe = useStripe()
  const cloudpayments = useCloudpayments()
  const [stripePaymentIntent, setStripePaymentIntent] = useState<any>()
  const pay = async (invoice: Invoice, order?: OrderWithItemsAndUserAndInvoice) => {
    switch (invoice.currency) {
      case CurrencyEnum.RUB:
        if (order) {
          cloudpayments.pay(invoice, order)
        }
        break
      case CurrencyEnum.EUR:
        const paymentIntent = await stripe.pay(invoice)
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
