import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useQuery } from "@blitzjs/rpc"
import getListRegionsForDelivery from "src/shipping-addresses/queries/getListRegionsForDelivery"
import { useField } from "react-final-form"
import { PickOptionsProps } from "./types"

export const PickProvinceOptions = ({ children }: PickOptionsProps) => {
  const { t } = useTranslation(["shippingAddress"])
  const { input: country } = useField("countryId")

  const [regions] = useQuery(
    getListRegionsForDelivery,
    { country_code: country.value },
    {
      staleTime: Infinity,
      enabled: !!country.value,
    }
  )

  const disabled = !country

  return children ? children(regions || [], disabled) : null
}
