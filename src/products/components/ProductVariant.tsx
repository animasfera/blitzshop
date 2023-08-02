import { Category, Item, Price } from "db"

import { ProductTitle } from "src/products/components/ProductTitle"
import { ProductPrice } from "src/products/components/ProductPrice"

interface ProductVariantProps {
  item: Item & { amount: Price; category: Category | null }
}

export const ProductVariant = (props: ProductVariantProps) => {
  const { item } = props

  return (
    <div className="flex justify-between">
      <ProductTitle item={item} />
      <ProductPrice amount={item.amount} />
    </div>
  )
}
