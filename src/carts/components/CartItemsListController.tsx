import { CartItemsList } from "src/carts/components/CartItemsList"
import { cartClient } from "../../core/hooks/useCart"

interface CartItemsListControllerProps {
  cart: cartClient
  isLoading: boolean

  onUpdateCartToItem: ({ id, qty }: { id: number; qty: number }) => Promise<void>
  onDeleteCartToItem: (id: number) => Promise<void>
}

export const CartItemsListController = (props: CartItemsListControllerProps) => {
  const { cart, isLoading, onUpdateCartToItem, onDeleteCartToItem } = props

  return (
    <section aria-labelledby="cart-heading" className="lg:col-span-7">
      <h2 id="cart-heading" className="sr-only">
        Items in your shopping cart
      </h2>

      <CartItemsList
        cartToItems={cart.getItems()}
        isLoading={isLoading}
        onUpdateCartToItem={onUpdateCartToItem}
        onDeleteCartToItem={onDeleteCartToItem}
      />
    </section>
  )
}

export default CartItemsListController
