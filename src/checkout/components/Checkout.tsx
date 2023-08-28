import React from "react"
import { useTranslation } from "react-i18next"

import { CheckoutOrder } from "src/checkout/components/CheckoutOrder"
import { CheckoutPayment } from "src/checkout/components/CheckoutPayment"

interface CheckoutProps {
  items: any[]
}

export const Checkout = (props: CheckoutProps) => {
  const { items } = props

  const { t } = useTranslation(["pages.checkout"])

  return (
    <div className="bg-white relative">
      <div className="absolute left-0 hidden h-full w-1/2 bg-white xl:block" aria-hidden="true" />
      <div
        className="absolute right-0 hidden h-full w-1/2 bg-indigo-900 xl:block"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 xl:grid-cols-2 xl:px-8 xl:pt-16">
        <h1 className="sr-only">{t("index.title")}</h1>

        <CheckoutOrder items={items} />

        <CheckoutPayment />
      </div>
    </div>
  )
}

export default Checkout
