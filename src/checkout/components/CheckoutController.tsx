"use client"
import React, { useState } from "react"
import { useQuery, invalidateQuery } from "@blitzjs/rpc"
import { useTranslation } from "react-i18next"
import { CurrencyEnum } from "db"

import { useCart } from "src/core/hooks/useCart"
import { Checkout } from "src/checkout/components/Checkout"
import getListCountriesForDelivery from "src/shipping-addresses/queries/delivery/getListCountriesForDelivery"
import getListRegionsForDelivery from "src/shipping-addresses/queries/delivery/getListRegionsForDelivery"
import getListCitiesForDelivery from "src/shipping-addresses/queries/delivery/getListCitiesForDelivery"
import getListPostalCodesForDelivery from "src/shipping-addresses/queries/delivery/getListPostalCodesForDelivery"
import getShippingCost from "src/shipping-addresses/queries/getShippingCost"
import getCdekListDeliveryPoints from "src/cdek/queries/getCdekListDeliveryPoints"

export const CheckoutController = () => {
  const cartClient = useCart()
  const { t } = useTranslation(["pages.checkout"])

  return <Checkout items={cartClient.getItems()} cartClient={cartClient} />
}

export default CheckoutController
