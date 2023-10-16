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
      <h2 className="sr-only">{t("shippingAddress:title")}</h2>
      <Form<S> {...props}>
        <div className="mx-auto max-w-2xl flex flex-col gap-10 px-4 xl:max-w-none xl:px-0">
          {/*<CheckoutPaymentFormInputsBlock title={t("payment.form.contact.title")}>*/}
          {/*  <LabeledTextField*/}
          {/*    name={"email"}*/}
          {/*    label={t("payment.form.contact.email.label")}*/}
          {/*    type={"email"}*/}
          {/*    placeholder={"example@mail.com"}*/}
          {/*    autoComplete={"email"}*/}
          {/*    outerProps={{ className: "mt-6" }}*/}
          {/*  />*/}
          {/*</CheckoutPaymentFormInputsBlock>*/}

          <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-4 xxl:grid-cols-5">
            <LabeledSelectField
              name={"countryIsoCode"}
              label={t("shippingAddress:form.country.label")}
              options={CountriesOptions}
              outerProps={{
                className: "sm:col-span-4 md:col-span-3 lg:col-span-5 xl:col-span-4 xxl:col-span-5",
              }}
            />

            <LabeledTextField
              name={"address"}
              label={t("shippingAddress:form.address.label")}
              placeholder={t("shippingAddress:form.address.label")}
              autoComplete={"street-address"}
              outerProps={{
                className: "sm:col-span-4 md:col-span-3 lg:col-span-5 xl:col-span-4 xxl:col-span-5",
              }}
            />

            <LabeledTextField
              name={"city"}
              label={t("shippingAddress:form.city.label")}
              placeholder={t("shippingAddress:form.city.placeholder")}
              autoComplete={"city-address"}
              outerProps={{
                className: "sm:col-span-4 md:col-span-3 lg:col-span-2 xl:col-span-4 xxl:col-span-2",
              }}
            />

            <LabeledTextField
              name={"region"}
              label={t("shippingAddress:form.region.label")}
              placeholder={t("shippingAddress:form.city.placeholder")}
              autoComplete={"region-address"}
              outerProps={{
                className: "sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-4 xxl:col-span-2",
              }}
            />

            <LabeledTextField
              name={"postalCode"}
              label={t("shippingAddress:form.postalCode.label")}
              placeholder={t("shippingAddress:form.postalCode.placeholder")}
              autoComplete={"postal-code-address"}
              outerProps={{
                className: "sm:col-span-2 md:col-span-1 xl:col-span-4 xxl:col-span-1",
              }}
            />
          </div>
        </div>
      </Form>
    </>
  )
}

export default ShippingAddressForm
