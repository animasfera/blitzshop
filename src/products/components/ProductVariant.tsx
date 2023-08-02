import { Item, Price } from "db"

/*
import { ProductsListItemTitle } from "src/products/components/ProductsListItemTitle"
import { ProductsListItemPrice } from "src/products/components/ProductsListItemPrice"
*/

interface ProductVariantProps {
  item: Item & { amount: Price }
}

export const ProductVariant = (props: ProductVariantProps) => {
  const { item } = props

  return (
    <div className="flex justify-between">
      <h1 className="text-xl font-medium text-gray-900">{item.title}</h1>
      <p className="text-xl font-medium text-gray-900">{item.amount.amount}</p>
    </div>
  )
}
