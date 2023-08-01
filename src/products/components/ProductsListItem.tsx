import { Category, ImageToItem, Image, Item, Price, Prisma } from "db"

import { ProductsListItemImage } from "src/products/components/ProductsListItemImage"
import { ProductsListItemVariant } from "src/products/components/ProductsListItemVariant"

interface ProductsListItemProps {
  item: Item & {
    amount: Price
    category: Category | null
    _count: Prisma.ItemCountOutputType
    coverImage: ImageToItem & {
      image: Image
    }
  }
}

export const ProductsListItem = (props: ProductsListItemProps) => {
  const { item } = props

  return (
    <li className="group relative">
      <ProductsListItemImage
        src={item.coverImage.image.url}
        alt={item.coverImage.image.title || item.title || ""}
      />
      <ProductsListItemVariant item={item} />
    </li>
  )
}
