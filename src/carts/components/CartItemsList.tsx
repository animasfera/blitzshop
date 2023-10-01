import { CartToItem, Image, ImageToItem, Item, Price } from "db"

import { CartItemsListItem } from "src/carts/components/CartItemsListItem"

interface CartItemsListProps {
  cartToItems: (CartToItem & {
    item: Item & {
      amount: Price
      coverImage: ImageToItem & {
        image: Image
      }
    }
  })[]
  isLoading: boolean

  handleUpdateCartToItem: ({ id, qty }: { id: number; qty: number }) => Promise<void>
  handleDeleteCartToItem: (id: number) => Promise<void>
}

export const CartItemsList = (props: CartItemsListProps) => {
  const { cartToItems, isLoading, handleUpdateCartToItem, handleDeleteCartToItem } = props

  return (
    <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
      {cartToItems.map((cartToItem) => (
        <CartItemsListItem
          key={`${cartToItem.id}-${cartToItem.itemId}`}
          cartToItem={cartToItem}
          isLoading={isLoading}
          handleUpdateCartToItem={handleUpdateCartToItem}
          handleDeleteCartToItem={handleDeleteCartToItem}
        />
      ))}
    </ul>
  )
}

export default CartItemsList
