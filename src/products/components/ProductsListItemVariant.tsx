import { Item, Price } from "db"

import { ProductsListItemTitle } from "src/products/components/ProductsListItemTitle"
import { ProductsListItemPrice } from "src/products/components/ProductsListItemPrice"

interface ProductsListItemVariantProps {
  item: Item & { amount: Price }
}

export const ProductsListItemVariant = (props: ProductsListItemVariantProps) => {
  const { item } = props

  return (
    <div className="mt-4 flex justify-between">
      <ProductsListItemTitle item={item} />
      <ProductsListItemPrice amount={item.amount} />
    </div>
  )
}
