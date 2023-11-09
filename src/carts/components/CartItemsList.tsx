import { CartItemsListItem } from "src/carts/components/CartItemsListItem"
import { CartItemWithItem } from "../../../types"

interface CartItemsListProps {
  cartToItems: CartItemWithItem[]
  isLoading: boolean

  onUpdateCartToItem: ({ id, qty }: { id: number; qty: number }) => Promise<void>
  onDeleteCartToItem: (id: number) => Promise<void>
}

export const CartItemsList = (props: CartItemsListProps) => {
  const { cartToItems, isLoading, onUpdateCartToItem, onDeleteCartToItem } = props

  return (
    <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
      {cartToItems.map((cartToItem) => (
        <CartItemsListItem
          key={`${cartToItem.id}-${cartToItem.itemId}`}
          cartToItem={cartToItem}
          isLoading={isLoading}
          onUpdateCartToItem={onUpdateCartToItem}
          onDeleteCartToItem={onDeleteCartToItem}
        />
      ))}
    </ul>
  )
}

export default CartItemsList
