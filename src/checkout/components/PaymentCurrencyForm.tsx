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
import { currencyFormat } from "../../core/helpers/Helpers"

interface CheckoutPaymentFormProps<S> extends FormProps<any> {
  amount: {
    RUB: number
    EUR: number
  }
}

export const PaymentCurrencyForm = <S extends z.ZodType<any, any>>(
  props: CheckoutPaymentFormProps<S>
) => {
  const { t } = useTranslation(["pages.checkout"])

  const rub = currencyFormat({ num: props.amount.RUB, currency: "RUB" })
  const eur = currencyFormat({ num: props.amount.EUR, currency: "EUR" })

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
                  label: t("pages.checkout:paymentCurrency.options.RUB") + ` ` + rub,
                  value: "RUB",
                },
                {
                  label: t("pages.checkout:paymentCurrency.options.EUR") + ` ` + eur,
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
