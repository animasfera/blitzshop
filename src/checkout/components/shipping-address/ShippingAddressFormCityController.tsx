import React from "react"
import { useQuery } from "@blitzjs/rpc"
import { useTranslation } from "react-i18next"

import { LabeledTextField } from "src/core/components/form/LabeledTextField"
import { LabeledSelectField } from "src/core/components/form/LabeledSelectField"
import getListCitiesForDelivery from "src/shipping-addresses/queries/getListCitiesForDelivery"

interface ShippingAddressFormCityControllerProps {
  // TODO: убрать deliveryMethod и сделать getShippingAddress
  deliveryMethod: { value: 1 | 2; label: string }
  country?: { value: string; label: string; img: string }
  province?: { value: number | string; label: string }
  city?: { value: number | string; label: string } | undefined

  handleCity: (value: { value: number | string; label: string }) => void
}

export const ShippingAddressFormCityController = (
  props: ShippingAddressFormCityControllerProps
) => {
  const { deliveryMethod, country, province, city, handleCity } = props

  const [cities] = useQuery(
    getListCitiesForDelivery,
    {
      // TODO: убрать deliveryMethod и сделать getShippingAddress
      deliveryMethod: deliveryMethod.value,
      country_code: country?.value,
      region:
        country?.value === "KZ" || country?.value === "RU" || country?.value === "BY"
          ? province?.value ?? undefined
          : province?.label ?? undefined,
    },
    {
      enabled:
        !!country?.value &&
        (country?.value === "KZ" || country?.value === "RU" || country?.value === "BY"
          ? !!province?.value
          : !!province?.label),
    }
  )

  const { t } = useTranslation(["shippingAddress"])

  if (
    deliveryMethod.value === 1
      ? !!country && cities?.length === 0
      : !!country && (cities?.length === 0 || !cities)
  )
    return (
      <LabeledTextField
        name={"city"}
        label={t("shippingAddress:fields.city.label")}
        autoComplete={"city-address"}
        outerProps={{
          className: "sm:col-span-2 md:col-span-4 lg:col-span-3 xl:col-span-4 xxl:col-span-3",
        }}
        required
        disabled={!country}
      />
    )

  return (
    <LabeledSelectField
      key={"city"}
      name={"city"}
      label={t("shippingAddress:fields.city.label")}
      selected={city}
      options={cities ?? []}
      handleChange={(obj: { value: string | number; label: string }) => {
        handleCity(obj)
      }}
      outerProps={{
        className: `xl:col-span-4
        ${
          deliveryMethod
            ? "sm:col-span-4 md:col-span-6 lg:col-span-5 xxl:col-span-5"
            : "sm:col-span-2 md:col-span-4 lg:col-span-3 xxl:col-span-3"
        }`,
      }}
      disabled={!country || !province}
      required
    />
  )
}

export default ShippingAddressFormCityController
