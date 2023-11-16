import ShippingAddressForm from "./ShippingAddressForm"
import {
  CreateShippingAddressSchema,
  ShippingAddressPlainType,
} from "../../shipping-addresses/schemas"
import React, { useState } from "react"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useTranslation } from "react-i18next"
import { ShippingAddress } from "@prisma/client"
import { useSession } from "@blitzjs/auth"
import getCurrentUserShippingAddresses from "../../shipping-addresses/queries/getCurrentUserShippingAddresses"
import Link from "next/link"
import updateShippingAddress from "../../shipping-addresses/mutations/updateShippingAddress"
import createShippingAddress from "../../shipping-addresses/mutations/createShippingAddress"

type ShippingAddressChoiceControllerProps = {
  onSelect: (address: ShippingAddress) => void
  shippingAddress?: ShippingAddress
}

export const ShippingAddressChoiceController = (props: ShippingAddressChoiceControllerProps) => {
  const { onSelect, shippingAddress } = props

  const [isEditing, setIsEditing] = useState(true)
  const { t } = useTranslation(["pages.checkout", "translation"])
  // const [{ shippingAddresses }] = useQuery(getCurrentUserShippingAddresses, {})
  // const [createShippingAddressMutation] = useMutation(createShippingAddress)
  // const [updateShippingAddressMutation] = useMutation(updateShippingAddress)
  // TODO get shipping addresses
  // TODO create shipping address
  // TODO edit shipping address

  const handleSubmit = (data) => {
    onSelect(data)
    setIsEditing(false)
  }

  return (
    <>
      {isEditing ? (
        <>
          <ShippingAddressForm
            submitText={shippingAddress ? t("translation:update") : t("translation:next")}
            initialValues={shippingAddress}
            schema={CreateShippingAddressSchema}
            onSubmit={async (shippingAddress) => {
              handleSubmit(shippingAddress)
            }}
          />
        </>
      ) : (
        <>
          {shippingAddress && (
            <div className={"my-4"}>
              <div>
                {shippingAddress.firstName} {shippingAddress.lastName}
              </div>
              <div>{shippingAddress.address}</div>
              <div>
                {shippingAddress.city} {shippingAddress.postalCode}
              </div>
              <div>{shippingAddress.countryId}</div>
              <div>{shippingAddress.phone}</div>
              <div>
                <Link
                  onClick={(e) => {
                    e.preventDefault()
                    setIsEditing(true)
                  }}
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {t("translation:edit")}
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
