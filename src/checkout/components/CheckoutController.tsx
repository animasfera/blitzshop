"use client"
import React, { useState } from "react"
import { useQuery, invalidateQuery } from "@blitzjs/rpc"
import { useTranslation } from "react-i18next"

import { Checkout } from "src/checkout/components/Checkout"
import { useCart } from "src/core/hooks/useCart"
import getListCountriesForDelivery from "src/shipping-addresses/queries/getListCountriesForDelivery"
import getListRegionsForDelivery from "src/shipping-addresses/queries/getListRegionsForDelivery"
import getListCitiesForDelivery from "src/shipping-addresses/queries/getListCitiesForDelivery"
import getListPostalCodesForDelivery from "src/shipping-addresses/queries/getListPostalCodesForDelivery"
import getShippingCost from "src/shipping-addresses/queries/getShippingCost"

import getCdekListDeliveryPoints from "src/cdek/queries/getCdekListDeliveryPoints"

export const CheckoutController = () => {
  const { t } = useTranslation(["pages.checkout"])
  const cartClient = useCart()

  const deliveryMethods: { value: 1 | 2; label: string }[] = [
    { value: 1, label: t("delivery.merhods.point") },
    { value: 2, label: t("delivery.merhods.door") },
  ]

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<{
    value: 1 | 2
    label: string
  }>(deliveryMethods[0] ?? { value: 1, label: t("delivery.merhods.door") })

  const [countries] = useQuery(getListCountriesForDelivery, {})
  const [country, setCountry] = useState<{ value: string; label: string; img: string } | undefined>(
    undefined
  )

  const [regions] = useQuery(getListRegionsForDelivery, { country_code: country?.value })
  const [region, setRegion] = useState<{ value: number | string; label: string } | undefined>(
    undefined
  )

  const [cities] = useQuery(getListCitiesForDelivery, {
    deliveryMethod: selectedDeliveryMethod.value,
    country_code: country?.value,
    region:
      country?.value === "KZ" || country?.value === "RU" || country?.value === "BY"
        ? region?.value
        : region?.label,
  })
  const [city, setCity] = useState<{ value: number | string; label: string } | undefined>(undefined)

  const [postalCodes] = useQuery(getListPostalCodesForDelivery, {
    country_code: country?.value,
    city_code: city?.value,
  })
  const [selectedPostalCode, setSelectedPostalCode] = useState<
    { value: string; label: string } | undefined
  >(undefined)

  const [deliverypoints] = useQuery(getCdekListDeliveryPoints, {
    country_code: country?.value,
    city_code: typeof city?.value === "number" ? city?.value : undefined,
  })

  const handleSelectedDeliveryMethod = (value: { value: 1 | 2; label: string }) => {
    setSelectedDeliveryMethod(value)
    invalidateQuery(getShippingCost)
  }

  const handleCountry = (value: { value: string; label: string; img: string }) => {
    setCountry(value)
  }

  const handleRegion = (value: { value: number | string; label: string }) => {
    setRegion(value)
  }

  const handleCity = (value: { value: number | string; label: string }) => {
    setCity(value)
  }

  const handlePostalCodes = (value: { value: string; label: string }) => {
    setSelectedPostalCode(value)
  }

  return (
    <Checkout
      cartClient={cartClient}
      deliveryMethods={deliveryMethods}
      deliveryMethod={selectedDeliveryMethod}
      countries={countries}
      country={country}
      regions={regions}
      region={region}
      cities={cities}
      city={city}
      postalCodes={postalCodes}
      selectedPostalCode={selectedPostalCode}
      handleDeliveryMethod={handleSelectedDeliveryMethod}
      handleCountry={handleCountry}
      handleRegion={handleRegion}
      handleCity={handleCity}
      handlePostalCodes={handlePostalCodes}
    />
  )
}

export default CheckoutController
