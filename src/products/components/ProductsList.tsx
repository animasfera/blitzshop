import { Category, ImageToItem, Image, Item, Price, Prisma } from "db"

import { ProductsListItem } from "src/products/components/ProductsListItem"

interface ProductsListProps {
  items: (Item & {
    amount: Price
    category: Category | null
    _count: Prisma.ItemCountOutputType
    coverImage: ImageToItem & {
      image: Image
    }
  })[]
}

export const ProductsList = (props: ProductsListProps) => {
  const { items } = props

  return (
    <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 px-2">
      {items.map((item) => (
        <ProductsListItem key={item.id} item={item} />
      ))}
    </ul>
  )
}
