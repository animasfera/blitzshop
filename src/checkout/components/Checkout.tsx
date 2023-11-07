import React from "react"
import { useTranslation } from "react-i18next"

import { CheckoutOrder } from "src/checkout/components/CheckoutOrder"
import { CheckoutDeliveryMethod } from "src/checkout/components/CheckoutDeliveryMethod"
import { CheckoutPayment } from "src/checkout/components/CheckoutPayment"
import { cartClient } from "src/core/hooks/useCart"

interface CheckoutProps {
  cart: cartClient
  deliveryMethods: { value: 1 | 2; label: string }[]
  deliveryMethod: { value: 1 | 2; label: string }
  countries: { value: string; label: string; img: string }[]
  country?: { value: string; label: string; img: string }
  regions: { value: number | string; label: string }[]
  region?: { value: number | string; label: string }
  cities: { value: number | string; label: string }[]
  city?: { value: number | string; label: string }
  postalCodes: { value: string; label: string }[]
  selectedPostalCode?: { value: string; label: string }

  handleDeliveryMethod: (el: { value: 1 | 2; label: string }) => void
  handleCountry: (el: { value: string; label: string; img: string }) => void
  handleRegion: (el: { value: number | string; label: string }) => void
  handleCity: (el: { value: number | string; label: string }) => void
  handlePostalCodes: (el: { value: string; label: string }) => void
}

export const Checkout = (props: CheckoutProps) => {
  const {
    cart,
    deliveryMethods,
    deliveryMethod,
    countries,
    country,
    regions,
    region,
    cities,
    city,
    postalCodes,
    selectedPostalCode,

    handleDeliveryMethod,
    handleCountry,
    handleRegion,
    handleCity,
    handlePostalCodes,
  } = props

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

        <CheckoutOrder cart={cart} />

        <div>
          <CheckoutDeliveryMethod
            deliveryMethods={deliveryMethods}
            deliveryMethod={deliveryMethod}
            handleDeliveryMethod={handleDeliveryMethod}
          />

          <CheckoutPayment
            deliveryMethod={deliveryMethod}
            countries={countries}
            country={country}
            regions={regions}
            region={region}
            cities={cities}
            city={city}
            postalCodes={postalCodes}
            selectedPostalCode={selectedPostalCode}
            handleCountry={handleCountry}
            handleRegion={handleRegion}
            handleCity={handleCity}
            handlePostalCodes={handlePostalCodes}
          />
        </div>
      </div>
    </div>
  )
}

export default Checkout
