import LabeledSelectField from "../../../core/components/form/LabeledSelectField"
import React, { PropsWithChildren, ReactElement, useState } from "react"
import { useTranslation } from "react-i18next"
import { useQuery } from "@blitzjs/rpc"
import getListCitiesForDelivery from "../../../shipping-addresses/queries/getListCitiesForDelivery"
import { useField } from "react-final-form"
import { PickOptionsProps } from "./types"

export const PickCitiesOptions = ({ children }: PickOptionsProps) => {
  const { t } = useTranslation(["shippingAddress"])
  const { input: deliveryMethod } = useField("deliveryMethod")
  const { input: country } = useField("countryId")
  const { input: region } = useField("province")

  const [cities] = useQuery(
    getListCitiesForDelivery,
    {
      deliveryMethod: 1, //deliveryMethod.value,
      country_code: country.value,
      regionId: region.value.value,
      regionLabel: region.value.label,
    },
    {
      staleTime: Infinity,
      enabled: !!country.value,
      //&& !!region.value.value,
      // && !!deliveryMethod.value,
    }
  )
  const disabled = !country || !region // || !deliveryMethod

  return children ? children(cities || [], disabled) : null
}
