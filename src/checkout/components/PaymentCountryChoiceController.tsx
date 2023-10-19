import React from "react"
import { CurrencyEnum } from "@prisma/client"
import PaymentCountryForm from "./PaymentCountryForm"
import getPaymentMethods from "../../payment-methods/queries/getPaymentMethods"
import { useQuery } from "@blitzjs/rpc"
import { z } from "zod"

type PaymentCountryChoiceControllerProps = {
  onSubmit: (values: { paymentMethodId: number }) => void
}

export const PaymentCountryChoiceController = (props: PaymentCountryChoiceControllerProps) => {
  const { onSubmit } = props

  const [{ paymentMethods }] = useQuery(getPaymentMethods, {})

  return (
    <>
      <PaymentCountryForm
        schema={z.object({
          paymentMethodId: z.number(),
        })}
        paymentMethods={paymentMethods}
        submitText={"Pay"}
        onSubmit={(values) => {
          onSubmit && onSubmit(values)
        }}
      />
    </>
  )
}
