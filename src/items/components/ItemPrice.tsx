import { Money } from "src/core/components/Money"
import { CurrencyEnum } from "@prisma/client"

interface ItemPriceProps {
  price: number
  currency: CurrencyEnum
}

export const ItemPrice = (props: ItemPriceProps) => {
  const { price, currency } = props

  return (
    <p className="text-xl font-medium text-gray-900">
      <Money amount={price} currency={currency} />
    </p>
  )
}

export default ItemPrice
