import React from "react"
import { useTranslation } from "react-i18next"

import { Form, FormProps } from "src/core/components/form/Form"
import { LabeledTextField } from "src/core/components/form/LabeledTextField"
import { CheckoutPaymentFormInputsBlock } from "src/checkout/components/CheckoutPaymentFormInputsBlock"
import LabeledSelectField from "../../core/components/form/LabeledSelectField"
import { CountriesOptions } from "../../core/Countries"
import { z } from "zod"

interface CheckoutPaymentFormProps<S> extends FormProps<any> {}

export const ShippingAddressForm = <S extends z.ZodType<any, any>>(
  props: CheckoutPaymentFormProps<S>
) => {
  const {} = props

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

          <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-4 xxl:grid-cols-5">
            <LabeledSelectField
              name={"countryId"}
              label={t("shippingAddress:fields.country.label")}
              options={CountriesOptions}
              outerProps={{
                className: "sm:col-span-4 md:col-span-3 lg:col-span-5 xl:col-span-4 xxl:col-span-5",
              }}
            />

            <LabeledTextField
              name={"address"}
              label={t("shippingAddress:fields.address.label")}
              autoComplete={"street-address"}
              outerProps={{
                className: "sm:col-span-4 md:col-span-3 lg:col-span-5 xl:col-span-4 xxl:col-span-5",
              }}
            />

            <LabeledTextField
              name={"city"}
              label={t("shippingAddress:fields.city.label")}
              autoComplete={"city-address"}
              outerProps={{
                className: "sm:col-span-4 md:col-span-3 lg:col-span-2 xl:col-span-4 xxl:col-span-2",
              }}
            />

            <LabeledTextField
              name={"province"}
              label={t("shippingAddress:fields.province.label")}
              autoComplete={"province-address"}
              outerProps={{
                className: "sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-4 xxl:col-span-2",
              }}
            />

            <LabeledTextField
              name={"postalCode"}
              label={t("shippingAddress:fields.postalCode.label")}
              autoComplete={"postal-code-address"}
              outerProps={{
                className: "sm:col-span-2 md:col-span-1 xl:col-span-4 xxl:col-span-1",
              }}
            />
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
