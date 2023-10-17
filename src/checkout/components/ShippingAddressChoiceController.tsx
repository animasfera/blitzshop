import ShippingAddressForm from "./ShippingAddressForm"
import {
  CreateShippingAddressSchema,
  ShippingAddressPlainType,
} from "../../shipping-addresses/schemas"
import React from "react"
import { useQuery } from "@blitzjs/rpc"
import { useTranslation } from "react-i18next"
import { ShippingAddress } from "@prisma/client"
import { useSession } from "@blitzjs/auth"
import getCurrentUserShippingAddresses from "../../shipping-addresses/queries/getCurrentUserShippingAddresses"

type ShippingAddressChoiceControllerProps = {
  onSelect: (address: ShippingAddress) => void
}

export const ShippingAddressChoiceController = (props: ShippingAddressChoiceControllerProps) => {
  const { onSelect } = props

  // const [shippingAddresses] = useQuery(getCurrentUserShippingAddresses, {})
  const { t } = useTranslation(["pages.checkout"])

  return (
    <>
      <ShippingAddressForm
        submitText={t("pages.checkout:chooseMethod")}
        initialValues={{}}
        schema={CreateShippingAddressSchema}
        onSubmit={(address) => {
          onSelect(address)
        }}
      />
    </>
  )
}
