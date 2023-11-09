import { Money } from "src/core/components/Money"
import { CurrencyEnum } from "@prisma/client"

interface ItemsListItemPriceProps {
  price: number
  currency: CurrencyEnum
  ceil?: boolean
}

export const ItemsListItemPrice = (props: ItemsListItemPriceProps) => {
  const { price, currency, ceil } = props

  return (
    <p className="text-sm font-medium text-gray-900">
      <Money amount={price} currency={currency} ceil={ceil} />
    </p>
  )
}
