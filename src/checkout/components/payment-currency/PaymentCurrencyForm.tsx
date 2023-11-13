import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Form, FormProps } from "src/core/components/form/Form"
import { z } from "zod"
import { CurrencyEnum, PaymentMethod } from "@prisma/client"
import RadioSelectedCardsField from "../../../core/components/form/RadioSelectedCardsField"
import { Money } from "../../../core/components/Money"
import { ShippingMethodWithPrice } from "../../../shipping-methods/schemas"
import RadioButtonsField from "../../../core/components/form/RadioButtonsField"
import PaymentMethods from "../../../pages/payment-methods"

interface CheckoutPaymentFormProps<S> extends FormProps<any> {}

export const PaymentCurrencyForm = <S extends z.ZodType<any, any>>(
  props: CheckoutPaymentFormProps<S>
) => {
  const { t } = useTranslation(["pages.checkout"])

  return (
    <>
      <div className={"my-4"}>{t("pages.checkout:paymentCurrency.description")}</div>
      <Form<S> {...props}>
        <div className="mx-auto max-w-2xl flex flex-col gap-10 px-4 xl:max-w-none xl:px-0">
          <div className="">
            <RadioSelectedCardsField
              name={"currency"}
              label={""}
              options={[
                {
                  label: t("pages.checkout:paymentCurrency.options.RUB"),
                  value: "RUB",
                },
                {
                  label: t("pages.checkout:paymentCurrency.options.EUR"),
                  value: "EUR",
                },
              ]}
            />
          </div>
        </div>
      </Form>
    </>
  )
}

export default PaymentCurrencyForm
