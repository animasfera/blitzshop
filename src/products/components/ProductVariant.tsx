import { Item, Price } from "db"

import { ProductTitle } from "src/products/components/ProductTitle"

/*
import { ProductsListItemPrice } from "src/products/components/ProductsListItemPrice"
*/

interface ProductVariantProps {
  item: Item & { amount: Price }
}

export const ProductVariant = (props: ProductVariantProps) => {
  const { item } = props

  return (
    <div className="flex justify-between">
      <ProductTitle item={item} />
      <p className="text-xl font-medium text-gray-900">{item.amount.amount}</p>
    </div>
  )
}
