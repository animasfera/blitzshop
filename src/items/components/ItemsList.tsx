import { Category, ImageToItem, Image, Item, Prisma, Cart, CartToItem } from "db"

import { ItemsListItem } from "src/items/components/itemsListItem"

interface ItemsListProps {
  items: (Item & { images: (ImageToItem & { image: Image })[] } & {
    category: Category | null
    _count: Prisma.ItemCountOutputType
  })[]
  isLoading: boolean

  handleClick: (item: Item) => Promise<void>
}

export const ItemsList = (props: ItemsListProps) => {
  const { items, isLoading, handleClick } = props

  return (
    <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 px-2">
      {items.map((item) => (
        <ItemsListItem key={item.id} item={item} isLoading={isLoading} />
      ))}
    </ul>
  )
}
