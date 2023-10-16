import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Form, FormProps } from "src/core/components/form/Form"
import { z } from "zod"
import { CurrencyEnum } from "@prisma/client"
import RadioSelectedCardsField from "../../core/components/form/RadioSelectedCardsField"
import { Money } from "../../core/components/Money"

interface CheckoutPaymentFormProps<S> extends FormProps<any> {
  methods: {
    id: number
    title: string
    price: number
    currency: CurrencyEnum
  }[]
}

export const ShippingMethodForm = <S extends z.ZodType<any, any>>(
  props: CheckoutPaymentFormProps<S>
) => {
  const { methods } = props

  const { t } = useTranslation(["pages.checkout"])

  const radioOptions = methods.map((m) => {
    return {
      value: m.id,
      label: m.title,
      footerText: <Money amount={m.price} currency={m.currency} />,
    }
  })

  return (
    <>
      <Form<S> {...props}>
        <div className="mx-auto max-w-2xl flex flex-col gap-10 px-4 xl:max-w-none xl:px-0">
          <div className="mt-10 border-t border-gray-200 pt-10">
            <RadioSelectedCardsField name={"shippingMethod"} label={""} options={radioOptions} />
          </div>
        </div>
      </Form>
    </>
  )
}

export default ShippingMethodForm
