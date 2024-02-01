import React from "react"
import { useTranslation } from "react-i18next"
import { useQuery } from "@blitzjs/rpc"
import { useField } from "react-final-form"

import { LabeledSelectFieldAutocomlete } from "src/core/components/form/LabeledSelectFieldAutocomlete"
import getListRegionsForDelivery from "src/shipping-addresses/queries/delivery/getListRegionsForDelivery"
import { LabeledTextField } from "src/core/components/form/LabeledTextField"

export const PickProvinceOptions = () => {
  const { t } = useTranslation(["shippingAddress"])
  const { input: country } = useField("countryId")
  const { input: province } = useField("province")
  const { input: provinceId } = useField("provinceId")
  const { input: city } = useField("city")
  const { input: cityId } = useField("cityId")
  const { input: address } = useField("address")

  const [regions] = useQuery(
    getListRegionsForDelivery,
    { country_code: country.value },
    {
      staleTime: Infinity,
      enabled: !!country.value,
    }
  )

  const className = "sm:col-span-4 md:col-span-1 lg:col-span-2 xl:col-span-4 xxl:col-span-2"

  if (!regions || regions.length === 0) {
    return (
      <LabeledTextField
        key={"province"}
        name={"province"}
        label={t("shippingAddress:fields.province.label")}
        type={"text"}
        autoComplete={"province"}
        outerProps={{ className }}
        handleChange={() => {
          provinceId.onChange(undefined)
          city.onChange(undefined)
          cityId.onChange(undefined)
          address.onChange(undefined)
        }}
        required
        disabled={!country || !country?.value.length}
      />
    )
  }

  return (
    <LabeledSelectFieldAutocomlete
      name={"provinceId"}
      label={t("shippingAddress:fields.province.label")}
      options={regions ?? []}
      outerProps={{ className }}
      handleChange={(val) => {
        const res = regions.find((el) => val === el.value)

        province.onChange(res?.label)
        provinceId.onChange(res?.value)
        city.onChange(undefined)
        cityId.onChange(undefined)
        address.onChange(undefined)
      }}
      required
      disabled={!country || !regions || regions.length === 0}
    />
  )
}
