import React from "react"
import { useTranslation } from "react-i18next"
import { useField } from "react-final-form"
import { DeliveryMethodEnum } from "db"

import { RadioSelectedCardsField } from "src/core/components/form/RadioSelectedCardsField"

type PickDeliveryMethodsOptionsProps = {}

export const PickDeliveryMethodsOptions = ({}: PickDeliveryMethodsOptionsProps) => {
  const { t } = useTranslation(["shippingAddress"])
  const { input: deliveryMethod } = useField("deliveryMethod")
  const { input: province } = useField("province")
  const { input: provinceId } = useField("provinceId")
  const { input: city } = useField("city")
  const { input: cityId } = useField("cityId")
  const { input: address } = useField("address")

  const options = [
    { label: t("shippingMethod:methods.door.title"), value: DeliveryMethodEnum.DOOR },
    { label: t("shippingMethod:methods.pickup.title"), value: DeliveryMethodEnum.PICKUP },
  ]

  return (
    <RadioSelectedCardsField
      name={"deliveryMethod"}
      label={t("shippingMethod:title")}
      defaultValue={options.find(({ value }) => value === deliveryMethod.value)}
      options={options}
      outerProps={{
        className: "sm:col-span-4 md:col-span-3 lg:col-span-5 xl:col-span-4 xxl:col-span-5",
      }}
      handleChange={() => {
        province.onChange(undefined)
        provinceId.onChange(undefined)
        city.onChange(undefined)
        cityId.onChange(undefined)
        address.onChange(undefined)
      }}
    />
  )
}
