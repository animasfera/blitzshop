import { Price } from "db"

import { CurrenciesEnum } from "src/core/enums/CurrenciesEnum"

interface ProductPriceProps {
  amount: Price
}

export const ProductPrice = (props: ProductPriceProps) => {
  const { amount } = props

  return (
    <p className="text-xl font-medium text-gray-900 whitespace-nowrap">
      {amount.amount} {CurrenciesEnum[amount.currency].symbol}
    </p>
  )
}
