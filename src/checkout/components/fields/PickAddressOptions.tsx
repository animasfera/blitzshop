import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useQuery } from "@blitzjs/rpc"
import { useField } from "react-final-form"

import { useCart } from "src/core/hooks/useCart"
import { LabeledSelectFieldAutocomlete } from "src/core/components/form/LabeledSelectFieldAutocomlete"
import { LabeledTextField } from "src/core/components/form/LabeledTextField"
import { DeliveryMethodEnum } from "@prisma/client"
import getListDeliveryPoints from "src/shipping-addresses/queries/delivery/getListDeliveryPoints"
import getShippingCost from "src/shipping-addresses/queries/getShippingCost"

interface PickAddressOptionsProps {
  handleSetOrder: (value?: number) => void
}

export const PickAddressOptions = (props: PickAddressOptionsProps) => {
  const { handleSetOrder } = props

  const [error, setError] = useState<string | undefined>(undefined)
  const { t } = useTranslation(["shippingAddress"])
  const { input: country } = useField("countryId")
  const { input: city } = useField("city")
  const { input: deliveryMethod } = useField("deliveryMethod")
  const { input: address } = useField("address")
  const cartClient = useCart()

  const [deliveryPoints] = useQuery(
    getListDeliveryPoints,
    { country_code: country.value, city_code: city.value },
    {
      queryKey: ["addresses", deliveryMethod.value, country.value, city.value],
      staleTime: Infinity,
      enabled:
        !!country.value && !!city.value && deliveryMethod.value === DeliveryMethodEnum.PICKUP,
    }
  )

  const [shippingCost] = useQuery(
    getShippingCost,
    {
      deliveryMethod:
        deliveryMethod.value === DeliveryMethodEnum.DOOR || deliveryPoints?.length === 0 ? 2 : 1,
      shippingAddress: {
        country_code: country.value,
        city_code: city.value,
      },
      packages: cartClient.getItems().map((el) => ({
        weight: el.item.weight,
      })),
    },
    {
      enabled: !!country.value && !!city.value && !!deliveryPoints,
    }
  )

  useEffect(() => {
    if (!!shippingCost?.total_sum) {
      handleSetOrder(shippingCost.total_sum)
    }

    if (shippingCost?.error) {
      setError(shippingCost.error)
    } else {
      setError(undefined)
    }
  }, [shippingCost])

  const className = "sm:col-span-4 md:col-span-3 lg:col-span-5 xl:col-span-4 xxl:col-span-5"

  if (
    !deliveryPoints ||
    deliveryPoints.length === 0 ||
    deliveryMethod.value === DeliveryMethodEnum.DOOR
  ) {
    return (
      <LabeledTextField
        key={"address"}
        name={"address"}
        label={t("shippingAddress:fields.address.label")}
        type={"text"}
        autoComplete={"street-address"}
        outerProps={{ className }}
        required
        disabled={!country.value || !city.value}
        helperText={
          error
            ? error
            : deliveryMethod.value === DeliveryMethodEnum.PICKUP
            ? t("shippingAddress:fields.address.helperText")
            : undefined
        }
      />
    )
  }

  return (
    <LabeledSelectFieldAutocomlete
      key={"address"}
      name={"address"}
      label={t("shippingAddress:fields.address.label")}
      options={deliveryPoints ?? []}
      outerProps={{ className }}
      required
      disabled={!country.value || !city.value || !deliveryPoints || deliveryPoints.length === 0}
    />
  )
}
