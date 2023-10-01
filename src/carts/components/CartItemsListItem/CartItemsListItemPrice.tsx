import { Price } from "db"

import { Money } from "src/core/components/Money"

interface CartItemsListItemInfoProps {
  amount: Price
}

export const CartItemsListItemPrice = (props: CartItemsListItemInfoProps) => {
  const { amount } = props

  return (
    <p className="text-sm font-medium text-gray-900">
      <Money amount={amount.amount} currency={amount.currency} />
    </p>
  )
}

export default CartItemsListItemPrice
