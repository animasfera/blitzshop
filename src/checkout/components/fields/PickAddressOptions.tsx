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
  const { input: cityId } = useField("cityId")
  const { input: deliveryMethod } = useField("deliveryMethod")
  const { input: address } = useField("address")

  const cartClient = useCart()

  const [deliveryPoints] = useQuery(
    getListDeliveryPoints,
    { country_code: country.value, city_code: cityId.value },
    {
      queryKey: ["address", deliveryMethod.value, country.value, city.value, cityId.value],
      staleTime: Infinity,
      enabled:
        !!country.value &&
        (!!city.value || !!cityId.value) &&
        deliveryMethod.value === DeliveryMethodEnum.PICKUP,
    }
  )

  const isDeliveryPoints =
    deliveryMethod.value === DeliveryMethodEnum.PICKUP ? !!deliveryPoints : true

  const [shippingCost] = useQuery(
    getShippingCost,
    {
      deliveryMethod:
        deliveryMethod.value === DeliveryMethodEnum.DOOR || deliveryPoints?.length === 0 ? 2 : 1,
      shippingAddress: {
        country_code: country.value,
        city_code: cityId.value,
        city: city.value,
      },
      packages: cartClient.getItems().map((el) => ({
        weight: el.item.weight,
      })),
    },
    {
      queryKey: [deliveryMethod.value, country.value, cityId.value, city.value], // address.value // {`${deliveryMethod.value}-${}-${}-${}-${}`}
      enabled: !!country.value && (!!cityId.value || !!city.value) && isDeliveryPoints, // !!deliveryPoints,
      onSuccess(data) {
        if (!!data?.error) {
          setError(data.error)
          handleSetOrder(0)
        } else {
          setError(undefined)
          handleSetOrder(data?.total_sum ?? 0)
        }
      },
      onError(err) {
        setError(JSON.stringify(err))
      },
    }
  )

  const className = "sm:col-span-4 md:col-span-3 lg:col-span-5 xl:col-span-4 xxl:col-span-5"

  if (!deliveryPoints || deliveryPoints.length === 0) {
    return (
      <LabeledTextField
        key={"address"}
        name={"address"}
        label={t("shippingAddress:fields.address.label")}
        type={"text"}
        autoComplete={"street-address"}
        outerProps={{ className }}
        required
        // disabled={!country.value || !(!city.value || !cityId.value)}
        helperText={
          deliveryMethod.value === DeliveryMethodEnum.PICKUP && !!country.value && !!cityId.value
            ? t("shippingAddress:fields.address.helperText")
            : undefined
        }
        errorText={error}
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
      // disabled={!country.value || !city.value || !deliveryPoints || deliveryPoints.length === 0}
      helperText={
        deliveryMethod.value === DeliveryMethodEnum.PICKUP &&
        (!deliveryPoints || deliveryPoints.length === 0)
          ? t("shippingAddress:fields.address.helperText")
          : undefined
      }
      errorText={error}
      handleChange={(val) => {
        const pvz = deliveryPoints.find((el) => val === el.value)

        address.onChange(pvz?.label)
      }}
    />
  )
}
