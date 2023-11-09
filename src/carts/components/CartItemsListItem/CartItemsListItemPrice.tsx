import { Money } from "src/core/components/Money"
import { CurrencyEnum } from "@prisma/client"

interface CartItemsListItemInfoProps {
  amount: number
  currency: CurrencyEnum
}

export const CartItemsListItemPrice = ({ amount, currency }: CartItemsListItemInfoProps) => {
  return (
    <p className="text-sm font-medium text-gray-900">
      <Money amount={amount} currency={currency} />
    </p>
  )
}

export default CartItemsListItemPrice
