import React from "react"
import { useTranslation } from "react-i18next"

import { CheckoutOrderInfo } from "src/checkout/components/CheckoutOrderInfo"
import { CheckoutOrderItemsList } from "src/checkout/components/CheckoutOrderItemsList"

interface CheckoutOrderProps {
  items: any[]
}

export const CheckoutOrder = (props: CheckoutOrderProps) => {
  const { items } = props

  const { t } = useTranslation(["pages.checkout"])

  return (
    <section className="bg-indigo-900 py-12 text-indigo-300 md:px-10 xl:col-start-2 xl:row-start-1 xl:mx-auto xl:w-full xl:max-w-xl xl:bg-transparent xl:px-0 xl:pb-24 xl:pt-0">
      <div className="mx-auto max-w-2xl px-4 xl:max-w-none xl:px-0">
        <h2 className="sr-only">{t("order.title")}</h2>

        <CheckoutOrderInfo>
          <CheckoutOrderItemsList items={items} />
        </CheckoutOrderInfo>
      </div>
    </section>
  )
}

export default CheckoutOrder
