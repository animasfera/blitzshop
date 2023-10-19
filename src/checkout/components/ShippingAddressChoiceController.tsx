import ShippingAddressForm from "./ShippingAddressForm"
import {
  CreateShippingAddressSchema,
  ShippingAddressPlainType,
} from "../../shipping-addresses/schemas"
import React, { useState } from "react"
import { useQuery } from "@blitzjs/rpc"
import { useTranslation } from "react-i18next"
import { ShippingAddress } from "@prisma/client"
import { useSession } from "@blitzjs/auth"
import getCurrentUserShippingAddresses from "../../shipping-addresses/queries/getCurrentUserShippingAddresses"

type ShippingAddressChoiceControllerProps = {
  onSelect: (address: ShippingAddress) => void
  shippingAddress?: ShippingAddress
}

export const ShippingAddressChoiceController = (props: ShippingAddressChoiceControllerProps) => {
  const { onSelect, shippingAddress } = props

  // const [shippingAddresses] = useQuery(getCurrentUserShippingAddresses, {})
  const [isEditing, setIsEditing] = useState(true)
  const { t } = useTranslation(["pages.checkout", "translation"])

  return (
    <>
      {isEditing ? (
        <ShippingAddressForm
          submitText={t("translation:next")}
          initialValues={shippingAddress}
          schema={CreateShippingAddressSchema}
          onSubmit={(address) => {
            onSelect(address)
            setIsEditing(false)
          }}
        />
      ) : (
        <>
          {shippingAddress && (
            <div className={"mb-4"}>
              <div>
                {shippingAddress.firstName} {shippingAddress.lastName}
              </div>
              <div>
                {shippingAddress.address}, {shippingAddress.city}
              </div>
              <div>
                {shippingAddress.postalCode}, {shippingAddress.countryId}
              </div>
              <div>
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  {t("translation:edit")}
                </a>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
