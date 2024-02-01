import React from "react"
import { useTranslation } from "react-i18next"
import { useQuery } from "@blitzjs/rpc"
import { useField } from "react-final-form"
import { DeliveryMethodEnum } from "db"

import { LabeledSelectFieldAutocomlete } from "src/core/components/form/LabeledSelectFieldAutocomlete"
import { LabeledTextField } from "src/core/components/form/LabeledTextField"
import getListCitiesForDelivery from "src/shipping-addresses/queries/delivery/getListCitiesForDelivery"
import { number } from "zod"

export const PickCitiesOptions = () => {
  const { t } = useTranslation(["shippingAddress"])
  const { input: country } = useField("countryId")
  const { input: regionId } = useField("provinceId")
  const { input: region } = useField("province")
  const { input: city } = useField("city")
  const { input: cityId } = useField("cityId")
  const { input: deliveryMethod } = useField("deliveryMethod")
  const { input: address } = useField("address")

  const [cities] = useQuery(
    getListCitiesForDelivery,
    {
      deliveryMethod: deliveryMethod.value === DeliveryMethodEnum.PICKUP ? 1 : 2, // deliveryMethod.value
      country_code: country.value,
      regionId: typeof regionId.value === "number" ? regionId.value : undefined,
      regionLabel: regionId.value.label ?? region.value,
    },
    {
      queryKey: ["cities", deliveryMethod.value, country.value, region.value, regionId.value],
      staleTime: Infinity,
      enabled: !!country.value && (!!region.value || !!regionId.value), // && !!deliveryMethod.value,
    }
  )

  const isRegion = !!region.value || !!regionId.value
  const disabled = !country.value || !isRegion
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
          cityId.onChange(undefined)
        }}
        required
        disabled={disabled}
      />
    )
  }

  return (
    <LabeledSelectFieldAutocomlete
      key={"cityId"}
      name={"cityId"}
      label={t("shippingAddress:fields.city.label")}
      options={cities ?? []}
      outerProps={{ className }}
      handleChange={(val) => {
        const res = cities.find((el) => val === el.value)

        city.onChange(res?.label)
        cityId.onChange(res?.value)
        address.onChange(undefined)
      }}
      required
      disabled={disabled || !cities || cities.length === 0}
    />
  )
}
