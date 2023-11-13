import React from "react"
import { useQuery } from "@blitzjs/rpc"
import { ShippingAddress } from "@prisma/client"
import ShippingMethodForm from "./ShippingMethodForm"
import { ShippingMethodWithPrice } from "../../../shipping-methods/schemas"

type ShippingAddressChoiceControllerProps = {
  address: ShippingAddress
  onSelect: (shippingMethod: ShippingMethodWithPrice) => void
}

export const ShippingMethodChoiceController = (props: ShippingAddressChoiceControllerProps) => {
  const { address, onSelect } = props

  return (
    <>
      {/*<ShippingMethodForm*/}
      {/*  methods={shippingMethods}*/}
      {/*  submitText={"Choose payment method"}*/}
      {/*  onSubmit={(values) => {*/}
      {/*    const shippingMethod = shippingMethods.find((sm) => sm.id === values.shippingMethodId)*/}
      {/*    if (shippingMethod) {*/}
      {/*      onSelect(shippingMethod)*/}
      {/*    }*/}
      {/*  }}*/}
      {/*/>*/}
    </>
  )
}
