import { Price } from "db"

import { Money } from "src/core/components/Money"

interface ItemsListItemPriceProps {
  amount: Price
  ceil?: boolean
}

export const ItemsListItemPrice = (props: ItemsListItemPriceProps) => {
  const { amount, ceil } = props

  return (
    <p className="text-sm font-medium text-gray-900">
      <Money amount={amount.amount} currency={amount.currency} ceil={ceil} />
    </p>
  )
}
