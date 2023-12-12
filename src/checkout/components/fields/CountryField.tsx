import React from "react"
import { useTranslation } from "react-i18next"
import { useField } from "react-final-form"

import { LabeledSelectFieldAutocomlete } from "src/core/components/form/LabeledSelectFieldAutocomlete"
import { DeliveryMethodEnum } from "@prisma/client"

type CountryFieldControllerProps = {
  countries: { label: string; value: string; img?: string }[]
  onChange?: (countryIsoCode: string) => void
}

export const CountryField = ({ onChange, countries }: CountryFieldControllerProps) => {
  const { t } = useTranslation(["shippingAddress"])
  const { input: province } = useField("province")
  const { input: city } = useField("city")
  const { input: deliveryMethod } = useField("deliveryMethod")
  const { input: address } = useField("addresses")

  return (
    <LabeledSelectFieldAutocomlete
      name={"countryId"}
      label={t("shippingAddress:fields.country.label")}
      options={countries.sort((a, b) => {
        if (a.label < b.label) return -1
        if (a.label > b.label) return 1

        return 0
      })}
      outerProps={{
        className: "sm:col-span-4 md:col-span-3 lg:col-span-5 xl:col-span-4 xxl:col-span-5",
      }}
      handleChange={(value) => {
        city.onChange(undefined)
        province.onChange(undefined)
        address.onChange(undefined)
        deliveryMethod.onChange(
          value === "BY" || value === "KZ" || value === "RU"
            ? DeliveryMethodEnum.PICKUP
            : DeliveryMethodEnum.DOOR
        )
      }}
      required
      disabled={!countries || countries.length === 0}
    />
  )
}
