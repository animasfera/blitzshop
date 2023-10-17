import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Form, FormProps } from "src/core/components/form/Form"
import { z } from "zod"
import { CurrencyEnum } from "@prisma/client"
import RadioSelectedCardsField from "../../core/components/form/RadioSelectedCardsField"
import { Money } from "../../core/components/Money"
import { ShippingMethodWithPrice } from "../../shipping-methods/schemas"
import RadioButtonsField from "../../core/components/form/RadioButtonsField"

interface CheckoutPaymentFormProps<S> extends FormProps<any> {}

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

export const PaymentCurrencyForm = <S extends z.ZodType<any, any>>(
  props: CheckoutPaymentFormProps<S>
) => {
  const { methods } = props

  const { t, i18n } = useTranslation(["pages.checkout"])

  return (
    <>
      <Form<S> {...props}>
        <div className="mx-auto max-w-2xl flex flex-col gap-10 px-4 xl:max-w-none xl:px-0">
          <div className="mt-10 border-t border-gray-200 pt-10">
            <RadioButtonsField
              name={"currency"}
              label={t("pages.checkout:paymentCurrency")}
              options={radioOptions}
            />
          </div>
        </div>
      </Form>
    </>
  )
}

export default PaymentCurrencyForm
