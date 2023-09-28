import { Category, ImageToItem, Image, Item, Price, Prisma, Cart, CartToItem } from "db"

import { ItemsListItem } from "src/items/components/itemsListItem"

interface ItemsListProps {
  items: (Item & {
    amount: Price
    category: Category | null
    _count: Prisma.ItemCountOutputType
    coverImage: ImageToItem & {
      image: Image
    }
  })[]
  cart: (Cart & { cartToItems: CartToItem[] }) | null
  isLoading: boolean

  handleClick: (item: Item & { amount: Price }) => Promise<void>
}

export const ItemsList = (props: ItemsListProps) => {
  const { items, cart, isLoading, handleClick } = props

  return (
    <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 px-2">
      {items.map((item) => (
        <ItemsListItem
          key={item.id}
          item={item}
          cart={cart}
          isLoading={isLoading}
          handleClick={handleClick}
        />
      ))}
    </ul>
  )
}
