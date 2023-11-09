import React, { ReactElement } from "react"

interface CheckoutPaymentFormInputsBlockProps {
  title: string
  children: ReactElement | ReactElement[]
}

export const CheckoutPaymentFormInputsBlock = (props: CheckoutPaymentFormInputsBlockProps) => {
  const { title, children } = props

  return (
    <div className={"mb-12"}>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      {children}
    </div>
  )
}

export default CheckoutPaymentFormInputsBlock
