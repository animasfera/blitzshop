import React from "react"
import { useQuery } from "@blitzjs/rpc"
import { CurrencyEnum } from "@prisma/client"
import PaymentCurrencyForm from "./PaymentCurrencyForm"

type PaymentAddressChoiceControllerProps = {
  onSelect?: (currency: CurrencyEnum) => void
  onSubmit: (values: { currency: CurrencyEnum }) => void
}

export const PaymentMethodChoiceController = (props: PaymentAddressChoiceControllerProps) => {
  const { onSelect, onSubmit } = props

  return (
    <>
      <PaymentCurrencyForm
        submitText={"Pay"}
        onSubmit={(values) => {
          onSubmit && onSubmit(values)
        }}
      />
    </>
  )
}
