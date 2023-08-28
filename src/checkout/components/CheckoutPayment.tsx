import React from "react"
import { useTranslation } from "react-i18next"

import { CheckoutPaymentForm } from "src/checkout/components/CheckoutPaymentForm"

interface CheckoutPaymentProps {}

export const CheckoutPayment = (props: CheckoutPaymentProps) => {
  const {} = props

  const { t } = useTranslation(["pages.checkout"])

  return (
    <section className="py-16 xl:col-start-1 xl:row-start-1 xl:mx-auto xl:w-full xl:max-w-xl xl:pb-24 xl:pt-0">
      <h2 className="sr-only">{t("payment.title")}</h2>

      <CheckoutPaymentForm />
    </section>
  )
}

export default CheckoutPayment
