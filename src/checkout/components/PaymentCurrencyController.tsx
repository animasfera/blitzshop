import React from "react"
import { CurrencyEnum } from "@prisma/client"
import PaymentCurrencyForm from "./PaymentCurrencyForm"
import getPaymentMethods from "../../payment-methods/queries/getPaymentMethods"
import { useQuery } from "@blitzjs/rpc"
import { z } from "zod"

type PaymentCurrencyControllerProps = {
  onSubmit: (values: { paymentMethodId: number }) => void
}

export const PaymentCurrencyController = (props: PaymentCurrencyControllerProps) => {
  const { onSubmit } = props

  return (
    <>
      <PaymentCurrencyForm
        schema={z.object({
          currency: z.enum(["RUB", "EUR"]),
        })}
        submitText={"Pay"}
        onSubmit={(values) => {
          onSubmit && onSubmit(values)
        }}
      />
    </>
  )
}
