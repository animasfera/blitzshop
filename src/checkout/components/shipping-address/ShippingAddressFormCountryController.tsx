import React from "react"
import { useQuery } from "@blitzjs/rpc"
import { useTranslation } from "react-i18next"

import { LabeledSelectField } from "src/core/components/form/LabeledSelectField"
import getListCountriesForDelivery from "src/shipping-addresses/queries/getListCountriesForDelivery"

interface ShippingAddressFormCountryControllerProps {
  deliveryMethod: { value: 1 | 2; label: string }
  country?: { value: string; label: string; img: string }

  handleCountry: (value: { value: string; label: string; img: string }) => void
}

export const ShippingAddressFormCountryController = (
  props: ShippingAddressFormCountryControllerProps
) => {
  const { deliveryMethod, country, handleCountry } = props

  const [countries] = useQuery(
    getListCountriesForDelivery,
    {
      deliveryMethod: deliveryMethod.value,
    },
    {}
  )

  const { t } = useTranslation(["shippingAddress"])

  return (
    <LabeledSelectField
      key={"countryId"}
      name={"countryId"}
      label={t("shippingAddress:fields.country.label")}
      selected={country}
      options={countries ?? []}
      handleChange={(obj: { value: string; label: string; img: string }) => {
        handleCountry(obj)
      }}
      outerProps={{
        className: "sm:col-span-2 md:col-span-3 lg:col-span-3 xl:col-span-4 xxl:col-span-3",
      }}
      disabled={!countries}
      required
    />
  )
}

export default ShippingAddressFormCountryController
