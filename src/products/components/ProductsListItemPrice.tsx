import { Price } from "db"

import { CurrenciesEnum } from "src/core/enums/CurrenciesEnum"

interface ProductsListItemPriceProps {
  amount: Price
}

export const ProductsListItemPrice = (props: ProductsListItemPriceProps) => {
  const { amount } = props

  return (
    <p className="text-sm font-medium text-gray-900 whitespace-nowrap">
      {amount.amount} {CurrenciesEnum[amount.currency].symbol}
    </p>
  )
}
