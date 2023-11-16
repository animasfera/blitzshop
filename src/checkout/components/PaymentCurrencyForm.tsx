import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Form, FormProps } from "src/core/components/form/Form"
import { z } from "zod"
import RadioSelectedCardsField from "../../core/components/form/RadioSelectedCardsField"
import { currencyFormat } from "../../core/helpers/Helpers"
import Button from "../../core/tailwind-ui/application-ui/elements/buttons/Button"

interface CheckoutPaymentFormProps<S> extends FormProps<any> {
  amount: {
    RUB: number
    EUR: number
  }
  disabled?: boolean
}

export const PaymentCurrencyForm = <S extends z.ZodType<any, any>>(
  props: CheckoutPaymentFormProps<S>
) => {
  const { t } = useTranslation(["pages.checkout", "translation"])
  const { disabled, amount } = props

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
        <Button
          type={"submit"}
          disabled={disabled}
          buttonText={disabled ? t("translation.loadingPaymentWidget") : t("translation:next")}
        />
      </Form>
    </>
  )
}

export default PaymentCurrencyForm
