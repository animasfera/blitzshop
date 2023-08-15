import { Category, Item, Price } from "db"

import { ProductTitle } from "src/items/components/ProductTitle"
import { Money } from "src/core/components/Money"

interface ProductVariantProps {
  item: Item & { amount: Price; category: Category | null }
}

export const ProductVariant = (props: ProductVariantProps) => {
  const { item } = props

  return (
    <div className="flex justify-between">
      <ProductTitle item={item} />
      <Money amount={item.amount.amount} currency={item.amount.currency} />
    </div>
  )
}
