import React, { useEffect, useState } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Box } from "@chakra-ui/react"
import { Button } from "src/core/tailwind-ui/application-ui/elements/buttons/Button"
import { useTranslation } from "react-i18next"

type StripeCheckoutFormProps = {
  orderId: number
}

export function StripeCheckoutForm(props: StripeCheckoutFormProps) {
  const { orderId } = props
  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = useState<string | null | undefined>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation(["translation"])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: process.env.NEXT_PUBLIC_SITE_URL + "/orders/" + orderId + "?success=1",
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message)
    } else {
      setMessage("An unexpected error occurred.")
    }

    setIsLoading(false)
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <Box mt={6}>
        <Button
          type={"submit"}
          disabled={isLoading || !stripe || !elements}
          // isLoading={isLoading}
          buttonText={t("pay")}
        />
      </Box>
    </form>
  )
}
