import React from "react"
import { useTranslation } from "react-i18next"
import { useQuery } from "@blitzjs/rpc"
import { useField } from "react-final-form"
import { DeliveryMethodEnum } from "db"

import { LabeledSelectFieldAutocomlete } from "src/core/components/form/LabeledSelectFieldAutocomlete"
import { LabeledTextField } from "src/core/components/form/LabeledTextField"
import getListCitiesForDelivery from "src/shipping-addresses/queries/delivery/getListCitiesForDelivery"

export const PickCitiesOptions = () => {
  const { t } = useTranslation(["shippingAddress"])
  const { input: country } = useField("countryId")
  const { input: region } = useField("province")
  const { input: deliveryMethod } = useField("deliveryMethod")
  const { input: address } = useField("addresses")

  const [cities] = useQuery(
    getListCitiesForDelivery,
    {
      deliveryMethod: deliveryMethod.value === DeliveryMethodEnum.PICKUP ? 1 : 2, // deliveryMethod.value
      country_code: country.value,
      regionId: region.value,
      regionLabel: region.value.label,
    },
    {
      queryKey: ["cities", deliveryMethod.value, country.value, region.value],
      staleTime: Infinity,
      enabled: !!country.value && !!region.value, // && !!deliveryMethod.value,
    }
  )

  const disabled = !country || !region || country.length === 0 || region.length === 0 // || !deliveryMethod
  const className = "sm:col-span-4 md:col-span-2 lg:col-span-3 xl:col-span-4 xxl:col-span-3"

  if (!cities || cities.length === 0) {
    return (
      <LabeledTextField
        key={"city"}
        name={"city"}
        label={t("shippingAddress:fields.city.label")}
        type={"text"}
        autoComplete={"city"}
        outerProps={{ className }}
        handleChange={() => {
          address.onChange(undefined)
        }}
        required
        disabled={disabled}
      />
    )
  }

  return (
    <LabeledSelectFieldAutocomlete
      key={"city"}
      name={"city"}
      label={t("shippingAddress:fields.city.label")}
      options={cities ?? []}
      outerProps={{ className }}
      handleChange={() => {
        address.onChange(undefined)
      }}
      required
      disabled={disabled || !cities || cities.length === 0}
    />
  )
}
