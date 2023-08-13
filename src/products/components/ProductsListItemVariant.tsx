import { Item, Price } from "db"

import { ProductsListItemTitle } from "src/products/components/ProductsListItemTitle"
import { Money } from "src/core/components/Money"

interface ProductsListItemVariantProps {
  item: Item & { amount: Price }
}

export const ProductsListItemVariant = (props: ProductsListItemVariantProps) => {
  const { item } = props

  return (
    <div className="mt-4 flex justify-between">
      <ProductsListItemTitle item={item} />
      <Money amount={item.amount.amount} currency={item.amount.currency} />
    </div>
  )
}
