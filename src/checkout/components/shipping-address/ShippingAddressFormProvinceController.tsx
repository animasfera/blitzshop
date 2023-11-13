import React from "react"
import { useQuery } from "@blitzjs/rpc"
import { useTranslation } from "react-i18next"

import { LabeledTextField } from "src/core/components/form/LabeledTextField"
import { LabeledSelectField } from "src/core/components/form/LabeledSelectField"
import getListRegionsForDelivery from "src/shipping-addresses/queries/getListRegionsForDelivery"

interface ShippingAddressFormProvinceControllerProps {
  country?: { value: string; label: string; img: string }
  province?: { value: number | string; label: string }

  handleProvince: (value: { value: number | string; label: string }) => void
}

export const ShippingAddressFormProvinceController = (
  props: ShippingAddressFormProvinceControllerProps
) => {
  const { country, province, handleProvince } = props

  const [provinces] = useQuery(
    getListRegionsForDelivery,
    {
      country_code: country?.value,
    },
    {
      enabled: !!country?.value,
    }
  )

  const { t } = useTranslation(["shippingAddress"])

  if (!!country && provinces?.length === 0)
    return (
      <LabeledTextField
        name={"province"}
        label={t("shippingAddress:fields.province.label")}
        autoComplete={"province-address"}
        outerProps={{
          className: "sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-4 xxl:col-span-2",
        }}
        disabled={!country}
      />
    )

  return (
    <LabeledSelectField
      key={"province"}
      name={"province"}
      label={t("shippingAddress:fields.province.label")}
      selected={provinces?.find(
        (el) => el.value === province?.value || el.label === province?.label
      )}
      options={provinces ?? []}
      handleChange={(obj: { value: number | string; label: string }) => {
        handleProvince(obj)
      }}
      outerProps={{
        className: "sm:col-span-2 md:col-span-3 lg:col-span-2 xl:col-span-4 xxl:col-span-2",
      }}
      disabled={!country || !provinces || provinces.length === 0}
      required
    />
  )
}

export default ShippingAddressFormProvinceController
