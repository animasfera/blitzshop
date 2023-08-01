import { ImageToItem, Image, Item, Price } from "db"

import { ProductsListItemImage } from "src/products/components/ProductsListItemImage"
import { ProductsListItemVariant } from "src/products/components/ProductsListItemVariant"

interface ProductsListItemProps {
  item: Item & {
    amount: Price
    coverImage: ImageToItem & { image: Image }
  }
}

export const ProductsListItem = (props: ProductsListItemProps) => {
  const { item } = props

  return (
    <li className="group relative">
      <ProductsListItemImage image={item.coverImage.image} />
      <ProductsListItemVariant item={item} />
    </li>
  )
}
