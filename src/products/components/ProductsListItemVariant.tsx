import { Item, Price } from "db"

import { CurrenciesEnum } from "src/core/enums/CurrenciesEnum"
import { ProductsListItemTitle } from "src/products/components/ProductsListItemTitle"

interface ProductsListItemVariantProps {
  item: Item & { amount: Price }
}

export const ProductsListItemVariant = (props: ProductsListItemVariantProps) => {
  const { item } = props

  return (
    <div className="mt-4 flex justify-between">
      <ProductsListItemTitle item={item} />
      <p className="text-sm font-medium text-gray-900 whitespace-nowrap">
        {item.amount.amount} {CurrenciesEnum[item.amount.currency].symbol}
      </p>
    </div>
  )
}
