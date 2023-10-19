import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Form, FormProps } from "src/core/components/form/Form"
import { z } from "zod"
import { CurrencyEnum, PaymentMethod } from "@prisma/client"
import RadioSelectedCardsField from "../../core/components/form/RadioSelectedCardsField"
import { Money } from "../../core/components/Money"
import { ShippingMethodWithPrice } from "../../shipping-methods/schemas"
import RadioButtonsField from "../../core/components/form/RadioButtonsField"
import PaymentMethods from "../../pages/payment-methods"

interface CheckoutPaymentFormProps<S> extends FormProps<any> {
  paymentMethods: PaymentMethod[]
}

const radioOptions = [
  {
    label: "EUR",
    value: "EUR",
  },
  {
    label: "RUB",
    value: "RUB",
  },
]

export const PaymentCountryForm = <S extends z.ZodType<any, any>>(
  props: CheckoutPaymentFormProps<S>
) => {
  const { paymentMethods } = props

  const { t, i18n } = useTranslation(["pages.checkout"])

  const cloudpayments = paymentMethods.find((pm) => pm.name === "cloudpayments")
  if (!cloudpayments) {
    throw new Error("Cloudpayments payment method is not connected")
  }
  const stripe = paymentMethods.find((pm) => pm.name === "stripe")
  if (!stripe) {
    throw new Error("Stripe payment method is not connected")
  }

  return (
    <>
      <Form<S> {...props}>
        <div className="mx-auto max-w-2xl flex flex-col gap-10 px-4 xl:max-w-none xl:px-0">
          <div className="mt-10 border-t border-gray-200 pt-10">
            <RadioButtonsField
              name={"paymentMethodId"}
              label={t("pages.checkout:paymentMethod.label")}
              options={[
                {
                  label: t("pages.checkout:paymentMethod.options.cloudpayments"),
                  value: cloudpayments.id,
                },
                {
                  label: t("pages.checkout:paymentMethod.options.stripe"),
                  value: stripe.id,
                },
              ]}
            />
          </div>
        </div>
      </Form>
    </>
  )
}

export default PaymentCountryForm
