"use client"
import React, { useState } from "react"
import { useQuery, invalidateQuery } from "@blitzjs/rpc"
import { useTranslation } from "react-i18next"
import { useCart } from "../../core/hooks/useCart"

import { Checkout } from "src/checkout/components/Checkout"
import getListCountriesForDelivery from "src/shipping-addresses/queries/getListCountriesForDelivery"
import getListRegionsForDelivery from "src/shipping-addresses/queries/getListRegionsForDelivery"
import getListCitiesForDelivery from "src/shipping-addresses/queries/getListCitiesForDelivery"
import getListPostalCodesForDelivery from "src/shipping-addresses/queries/getListPostalCodesForDelivery"
import getShippingCost from "src/shipping-addresses/queries/getShippingCost"

import getCdekListDeliveryPoints from "src/cdek/queries/getCdekListDeliveryPoints"

export const CheckoutController = () => {
  const cartClient = useCart()
  const { t } = useTranslation(["pages.checkout"])

  return <Checkout items={cartClient.getItems()} cartClient={cartClient} />
}

export default CheckoutController
