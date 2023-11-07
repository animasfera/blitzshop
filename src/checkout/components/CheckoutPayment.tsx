import React from "react"
import { useTranslation } from "react-i18next"

import { CheckoutPaymentForm } from "src/checkout/components/CheckoutPaymentForm"

interface CheckoutPaymentProps {
  deliveryMethod: { value: 1 | 2; label: string }
  countries: { value: string; label: string; img: string }[]
  country?: { value: string; label: string; img: string }
  regions: { value: number | string; label: string }[]
  region?: { value: number | string; label: string }
  cities: { value: number | string; label: string }[]
  city?: { value: number | string; label: string }
  postalCodes: { value: string; label: string }[]
  selectedPostalCode?: { value: string; label: string }

  handleCountry: (el: { value: string; label: string; img: string }) => void
  handleRegion: (el: { value: number | string; label: string }) => void
  handleCity: (el: { value: number | string; label: string }) => void
  handlePostalCodes: (el: { value: string; label: string }) => void
}

export const CheckoutPayment = (props: CheckoutPaymentProps) => {
  const {
    deliveryMethod,
    countries,
    country,
    regions,
    region,
    cities,
    city,
    postalCodes,
    selectedPostalCode,

    handleCountry,
    handleRegion,
    handleCity,
    handlePostalCodes,
  } = props

  const { t } = useTranslation(["pages.checkout"])

  return (
    <section className="py-16 xl:col-start-1 xl:row-start-1 xl:mx-auto xl:w-full xl:max-w-xl xl:pb-24 xl:pt-0">
      <h2 className="sr-only">{t("payment.title")}</h2>

      <CheckoutPaymentForm
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
    </section>
  )
}

export default CheckoutPayment
