import React from "react"
import { useTranslation } from "react-i18next"
import { z } from "zod"

import { Form, FormProps } from "src/core/components/form/Form"
import { LabeledTextField } from "src/core/components/form/LabeledTextField"
import { LabeledSelectField } from "src/core/components/form/LabeledSelectField"
import { CheckoutPaymentFormInputsBlock } from "src/checkout/components/CheckoutPaymentFormInputsBlock"
import { CountriesOptions } from "../../../core/Countries"
import { ShippingAddressFormCountryController } from "src/checkout/components/shipping-address/ShippingAddressFormCountryController"
import { ShippingAddressFormProvinceController } from "src/checkout/components/shipping-address/ShippingAddressFormProvinceController"
import { ShippingAddressFormCityController } from "src/checkout/components/shipping-address/ShippingAddressFormCityController"
import { ShippingAddressFormPostalCodeController } from "src/checkout/components/shipping-address/ShippingAddressFormPostalCodeController"
import { ShippingAddressFormAddressController } from "src/checkout/components/shipping-address/ShippingAddressFormAddressController"

interface CheckoutPaymentFormProps<S> extends FormProps<any> {
  deliveryMethod: { value: 1 | 2; label: string }
  country?: { value: string; label: string; img: string }
  province?: { value: number | string; label: string }
  city?: { value: number | string; label: string } | undefined
  postalCode?: { value: string; label: string }
  address?: { value: string; label: string }

  handleCountry: (value: { value: string; label: string; img: string }) => void
  handleProvince: (value: { value: number | string; label: string }) => void
  handleCity: (value: { value: number | string; label: string }) => void
  handlePostalCode: (value: { value: string; label: string }) => void
  handleAddress: (value: { value: string; label: string }) => void
}

export const ShippingAddressForm = <S extends z.ZodType<any, any>>(
  props: CheckoutPaymentFormProps<S>
) => {
  const {
    deliveryMethod,
    country,
    province,
    city,
    postalCode,
    address,
    handleCountry,
    handleProvince,
    handleCity,
    handlePostalCode,
    handleAddress,
  } = props

  const { t } = useTranslation(["shippingAddress"])

  return (
    <>
      <Form<S> {...props}>
        <div className="mx-auto max-w-2xl flex flex-col gap-10 px-4 xl:max-w-none xl:px-0">
          <LabeledTextField
            name={"firstName"}
            label={t("shippingAddress:fields.firstName.label")}
            type={"text"}
            autoComplete={"first-name"}
            outerProps={{ className: "mt-6 mb-2" }}
          />
          <LabeledTextField
            name={"lastName"}
            label={t("shippingAddress:fields.lastName.label")}
            type={"text"}
            autoComplete={"last-name"}
            outerProps={{ className: "mb-2" }}
          />

          <div className=" mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-5 xl:grid-cols-4 xxl:grid-cols-5">
            <ShippingAddressFormCountryController
              deliveryMethod={deliveryMethod}
              country={country}
              handleCountry={handleCountry}
            />

            <ShippingAddressFormProvinceController
              country={country}
              province={province}
              handleProvince={handleProvince}
            />

            <ShippingAddressFormCityController
              deliveryMethod={deliveryMethod}
              country={country}
              province={province}
              city={city}
              handleCity={handleCity}
            />

            {/*
            {deliveryMethod.value === 2 && (
              <ShippingAddressFormPostalCodeController
                country={country}
                city={city}
                postalCode={postalCode}
                handlePostalCode={handlePostalCode}
              />
            )}

            <ShippingAddressFormAddressController
              deliveryMethod={deliveryMethod}
              country={country}
              province={province}
              city={city}
              address={address}
              handleAddress={handleAddress}
            />
            */}
          </div>
          <LabeledTextField
            name={"phone"}
            label={t("shippingAddress:fields.phone.label")}
            type={"text"}
            autoComplete={"phone"}
            outerProps={{ className: "mt-6 mb-2" }}
          />
        </div>
      </Form>
    </>
  )
}

export default ShippingAddressForm
