import { Price } from "db"

import { Money } from "src/core/components/Money"

interface ItemPriceProps {
  amount: Price
}

export const ItemPrice = (props: ItemPriceProps) => {
  const { amount } = props

  return (
    <p className="text-xl font-medium text-gray-900">
      <Money amount={amount.amount} currency={amount.currency} />
    </p>
  )
}

export default ItemPrice
