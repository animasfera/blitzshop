"use client"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { CurrencyEnum } from "db"

import { Checkout } from "src/checkout/components/Checkout"
import { useCart } from "src/core/hooks/useCart"

export const CheckoutController = () => {
  const { t } = useTranslation(["pages.checkout"])
  const cartClient = useCart()

  const deliveryMethods: { value: 1 | 2; label: string }[] = [
    { value: 1, label: t("delivery.merhods.point") },
    { value: 2, label: t("delivery.merhods.door") },
  ]

  const [deliveryCost, setDeliveryCost] = useState<
    { delivery_sum: number; currency: CurrencyEnum } | undefined
  >(undefined)

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<{
    value: 1 | 2
    label: string
  }>(deliveryMethods[0] ?? { value: 1, label: t("delivery.merhods.door") })

  const handleSelectedDeliveryMethod = (value: { value: 1 | 2; label: string }) => {
    setSelectedDeliveryMethod(value)
  }

  const handleDeliveryCost = (
    value: { delivery_sum: number; currency: CurrencyEnum } | undefined
  ) => {
    setDeliveryCost(value)
  }

  return (
    <Checkout
      cartClient={cartClient}
      deliveryMethods={deliveryMethods}
      deliveryMethod={selectedDeliveryMethod}
      deliveryCost={deliveryCost}
      handleDeliveryMethod={handleSelectedDeliveryMethod}
      handleDeliveryCost={handleDeliveryCost}
    />
  )
}

export default CheckoutController
