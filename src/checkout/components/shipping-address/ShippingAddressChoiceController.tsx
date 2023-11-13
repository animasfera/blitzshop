import ShippingAddressForm from "./ShippingAddressForm"
import {
  CreateShippingAddressSchema,
  GetShippingCostType,
  ShippingAddressPlainType,
} from "../../../shipping-addresses/schemas"
import React, { useEffect, useState } from "react"
import { useQuery } from "@blitzjs/rpc"
import { useTranslation } from "react-i18next"
import { CurrencyEnum, ShippingAddress } from "@prisma/client"
import { useSession } from "@blitzjs/auth"
import getCurrentUserShippingAddresses from "../../../shipping-addresses/queries/getCurrentUserShippingAddresses"
import Link from "next/link"
import getShippingCost from "src/shipping-addresses/queries/getShippingCost"

type ShippingAddressChoiceControllerProps = {
  deliveryMethod: { value: 1 | 2; label: string }
  shippingAddress?: ShippingAddress

  onSelect: (address: ShippingAddress) => void
  handleDeliveryCost: (value: { delivery_sum: number; currency: CurrencyEnum } | undefined) => void
}

export const ShippingAddressChoiceController = (props: ShippingAddressChoiceControllerProps) => {
  const { deliveryMethod, shippingAddress, onSelect, handleDeliveryCost } = props
  const { t } = useTranslation(["pages.checkout", "translation"])

  const [isEditing, setIsEditing] = useState(true)
  const [country, setCountry] = useState<{ value: string; label: string; img: string } | undefined>(
    undefined
  )
  const [province, setProvince] = useState<{ value: number | string; label: string } | undefined>(
    undefined
  )
  const [city, setCity] = useState<{ value: number | string; label: string } | undefined>(undefined)
  const [postalCode, setPostalCode] = useState<{ value: string; label: string } | undefined>(
    undefined
  )
  const [address, setAddress] = useState<{ value: string; label: string } | undefined>(undefined)

  const [shippingCost] = useQuery(
    getShippingCost,
    {
      // TODO: убрать deliveryMethod и сделать getShippingAddress
      deliveryMethod: deliveryMethod.value,
      shippingAddress: {
        country_code: country?.value,
        city_code: city?.value,
        city: city?.label ?? shippingAddress?.city,
        address: address?.label ?? shippingAddress?.address,
        postal_code: postalCode?.value ?? shippingAddress?.postalCode,
      },
      packages: [
        {
          weight: 10,
        },
      ],
    },
    {
      enabled:
        !!country?.value &&
        !!city?.value &&
        deliveryMethod.value === 1 &&
        (country?.value === "417" ||
        country?.value === "051" ||
        country?.value === "762" ||
        country?.value === "860"
          ? true // !!postalCode
          : true),
    }
  )

  const handleSubmit = (data) => {
    onSelect(data)
    setIsEditing(false)
  }

  const handleCountry = (value: { value: string; label: string; img: string }) => {
    setCountry(value)
    setProvince(undefined)
    setCity(undefined)
    setPostalCode(undefined)
  }

  const handleProvince = (value: { value: number | string; label: string }) => {
    setProvince(value)
    setCity(undefined)
    setPostalCode(undefined)
    handleDeliveryCost(undefined)
  }

  const handleCity = (value: { value: number | string; label: string }) => {
    setCity(value)
    setPostalCode(undefined)
    handleDeliveryCost(undefined)
  }

  const handlePostalCode = (value: { value: string; label: string }) => {
    setPostalCode(value)
    handleDeliveryCost(undefined)
  }

  const handleAddress = (value: { value: string; label: string }) => {
    setAddress(value)
    handleDeliveryCost(undefined)
  }

  useEffect(() => {
    if (shippingCost) {
      handleDeliveryCost(shippingCost)
    }
  }, [shippingCost])

  return (
    <>
      {isEditing ? (
        <ShippingAddressForm
          submitText={shippingAddress ? t("translation:update") : t("translation:next")}
          initialValues={{
            ...shippingAddress,
            countryId: country ? country.value : shippingAddress?.countryId,
            province: province?.value,
            city: city?.value ?? shippingAddress?.city,
            postalCode: postalCode?.value ?? shippingAddress?.postalCode,
            address: address?.value ?? shippingAddress?.address,
          }}
          // schema={CreateShippingAddressSchema}
          deliveryMethod={deliveryMethod}
          country={country}
          province={province}
          city={city}
          postalCode={postalCode}
          address={address}
          onSubmit={(data) => {
            handleSubmit({
              ...data,
              province: province?.label ?? "",
              city: city?.label ?? shippingAddress?.city,
              address: address?.value ?? data.address,
            })
          }}
          handleCountry={handleCountry}
          handleProvince={handleProvince}
          handleCity={handleCity}
          handlePostalCode={handlePostalCode}
          handleAddress={handleAddress}
        />
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
