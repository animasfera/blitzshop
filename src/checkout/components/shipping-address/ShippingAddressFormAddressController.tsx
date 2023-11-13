import React from "react"
import { useQuery } from "@blitzjs/rpc"
import { useTranslation } from "react-i18next"

import { LabeledTextField } from "src/core/components/form/LabeledTextField"
import { LabeledSelectField } from "src/core/components/form/LabeledSelectField"
import getListAddressesForDelivery from "src/shipping-addresses/queries/getListAddressesForDelivery"

interface ShippingAddressFormAddressControllerProps {
  deliveryMethod: { value: 1 | 2; label: string }
  country?: { value: string; label: string; img: string }
  province?: { value: number | string; label: string }
  city?: { value: number | string; label: string } | undefined
  address?: { value: string; label: string }

  handleAddress: (value: { value: string; label: string }) => void
}

export const ShippingAddressFormAddressController = (
  props: ShippingAddressFormAddressControllerProps
) => {
  const { deliveryMethod, country, province, city, address, handleAddress } = props

  const [addresses] = useQuery(
    getListAddressesForDelivery,
    {
      deliveryMethod: deliveryMethod.value,
      country_code: country?.value,
      region: province?.value,
      // @ts-ignore
      city_code: city?.value,
    },
    {
      enabled: !!country?.value && !!province?.value && !!city?.value,
    }
  )

  const { t } = useTranslation(["shippingAddress"])

  if (
    deliveryMethod.value === 1 &&
    (country?.value === "KZ" || country?.value === "RU" || country?.value === "BY")
  ) {
    return (
      <LabeledSelectField
        key={"city"}
        name={"address"}
        label={t("shippingAddress:fields.address.label")}
        selected={address}
        options={addresses ?? []}
        handleChange={(obj: { value: string; label: string }) => {
          handleAddress(obj)
        }}
        outerProps={{
          className: "sm:col-span-4 md:col-span-6 lg:col-span-5 xl:col-span-4 xxl:col-span-5",
        }}
        disabled={!country || !province || !city}
        required
      />
    )
  }

  return (
    <LabeledTextField
      name={"address"}
      label={t("shippingAddress:fields.address.label")}
      placeholder={t("shippingAddress:fields.address.label")}
      autoComplete={"street-address"}
      outerProps={{
        className: "sm:col-span-4 md:col-span-6 lg:col-span-5 xl:col-span-4 xxl:col-span-5",
      }}
    />
  )
}

export default ShippingAddressFormAddressController
