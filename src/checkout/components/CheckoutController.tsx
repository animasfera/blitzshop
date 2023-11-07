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
  console.log("deliverypoints", deliverypoints)

  /*
  const [shippingCost] = useQuery(getShippingCost, {
    deliveryMethod: selectedDeliveryMethod.value,
    shippingAddress: {
      country_code: country?.value, // "653",
      city_code: 250,
      city: "Екатеринбург",
      postal_code: "620000",
      address: "ул. Дзержинского, д. 29",
    },
    packages: [
      {
        weight: 4000, // !!! Общий вес (в граммах) - обязательное поле
        // Габариты упаковки:
        height: 10, // Высота (в сантиметрах) - НЕ обязательное поле
        length: 10, // Длина (в сантиметрах) - НЕ обязательное поле
        width: 10, // Ширина (в сантиметрах) - НЕ обязательное поле
      },
    ],
  })
  console.log("shippingCost", shippingCost)
  */

  const handleSelectedDeliveryMethod = (value: { value: 1 | 2; label: string }) => {
    setSelectedDeliveryMethod(value)
    invalidateQuery(getShippingCost)
  }

  const handleCountry = (value: { value: string; label: string; img: string }) => {
    setCountry(value)
    // setRegion(undefined)
    // invalidateQuery(getListCountriesForDelivery)
    // invalidateQuery(getListRegionsForDelivery)
    // invalidateQuery(getListCitiesForDelivery)
    // invalidateQuery(getListPostalCodesForDelivery)
  }

  const handleRegion = (value: { value: number | string; label: string }) => {
    setRegion(value)
    // setCity(undefined)
    // invalidateQuery(getListCountriesForDelivery)
    // invalidateQuery(getListRegionsForDelivery)
    // invalidateQuery(getListCitiesForDelivery)
    // invalidateQuery(getListPostalCodesForDelivery)
  }

  const handleCity = (value: { value: number | string; label: string }) => {
    setCity(value)
    // setSelectedPostalCode(undefined)
    // invalidateQuery(getListCountriesForDelivery)
    // invalidateQuery(getListRegionsForDelivery)
    // invalidateQuery(getListCitiesForDelivery)
    // invalidateQuery(getListPostalCodesForDelivery)
  }

  const handlePostalCodes = (value: { value: string; label: string }) => {
    setSelectedPostalCode(value)
    /*
    invalidateQuery(getListCountriesForDelivery)
    invalidateQuery(getListRegionsForDelivery)
    invalidateQuery(getListCitiesForDelivery)
    invalidateQuery(getListPostalCodesForDelivery)
    */
  }

  /*
  console.log("states", {
    country,
    region,
    city,
    selectedPostalCode,
  })
  */

  /*
  console.log("country", country)
  console.log("region", region)
  console.log("city", city)
  // console.log("selectedPostalCode", selectedPostalCode)
  */
  console.log("cities", cities)

  return (
    <Checkout
      cart={cartClient}
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
