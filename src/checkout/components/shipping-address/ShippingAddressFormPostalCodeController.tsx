import React from "react"
import { useQuery } from "@blitzjs/rpc"
import { useTranslation } from "react-i18next"

import { LabeledTextField } from "src/core/components/form/LabeledTextField"
import { LabeledSelectField } from "src/core/components/form/LabeledSelectField"
import getListPostalCodesForDelivery from "src/shipping-addresses/queries/getListPostalCodesForDelivery"

interface ShippingAddressFormPostalCodeControllerProps {
  country?: { value: string; label: string; img: string }
  city: { value: number | string; label: string } | undefined
  postalCode?: { value: string; label: string }

  handlePostalCode: (value: { value: string; label: string }) => void
}

export const ShippingAddressFormPostalCodeController = (
  props: ShippingAddressFormPostalCodeControllerProps
) => {
  const { country, city, postalCode, handlePostalCode } = props

  const [postalCodes] = useQuery(getListPostalCodesForDelivery, {
    country_code: country?.value,
    city_code: city?.value,
  })

  const { t } = useTranslation(["shippingAddress"])

  if (!!country && postalCodes.length === 0)
    return (
      <LabeledTextField
        name={"postalCode"}
        label={t("shippingAddress:fields.postalCode.label")}
        autoComplete={"postal-code-address"}
        outerProps={{
          className: "sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-4 xxl:col-span-2",
        }}
        required
      />
    )

  return (
    <LabeledSelectField
      key={"postalCode"}
      name={"postalCode"}
      label={t("shippingAddress:fields.postalCode.label")}
      selected={postalCodes.find(
        (el) => el.value === postalCode?.value || el.label === postalCode?.label
      )}
      options={postalCodes ?? []}
      handleChange={(obj: { value: string; label: string }) => {
        handlePostalCode(obj)
      }}
      outerProps={{
        className: "sm:col-span-2 md:col-span-3 lg:col-span-2 xl:col-span-4 xxl:col-span-2",
      }}
      disabled={!postalCodes || postalCodes.length === 0}
      required
    />
  )
}

export default ShippingAddressFormPostalCodeController
