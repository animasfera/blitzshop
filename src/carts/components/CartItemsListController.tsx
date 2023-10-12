import { usePaginatedQuery } from "@blitzjs/rpc"
import { Cart, CartToItem, Image, ImageToItem, Item, Price } from "db"

import { ListOrNotFoundMessage } from "src/core/components/ListOrNotFoundMessage"
import { CartItemsList } from "src/carts/components/CartItemsList"
import { usePagination } from "src/core/hooks/usePagination"
import getCartToItems from "src/cart-to-items/queries/getCartToItems"
import { cartClient } from "../../core/hooks/useCart"

interface CartItemsListControllerProps {
  cart: cartClient
  isLoading: boolean

  onUpdateCartToItem: ({ id, qty }: { id: number; qty: number }) => Promise<void>
  onDeleteCartToItem: (id: number) => Promise<void>
}

const ITEMS_PER_PAGE = 2

export const CartItemsListController = (props: CartItemsListControllerProps) => {
  const { cart, isLoading, onUpdateCartToItem, onDeleteCartToItem } = props

  // const pagination = usePagination()
  // const [{ cartToItems, hasMore, count }] = usePaginatedQuery(getCartToItems, {
  //   orderBy: { id: "asc" },
  //   skip: ITEMS_PER_PAGE * pagination.page,
  //   take: ITEMS_PER_PAGE,
  //   where: { cartId: cart.cart.id },
  // })

  return (
    <section aria-labelledby="cart-heading" className="lg:col-span-7">
      <h2 id="cart-heading" className="sr-only">
        Items in your shopping cart
      </h2>

      {/*<ListOrNotFoundMessage*/}
      {/*  countObjects={count} //*/}
      {/*  itemsPerPage={ITEMS_PER_PAGE}*/}
      {/*  pagination={pagination}*/}
      {/*  hasMore={hasMore}*/}
      {/*>*/}
      <CartItemsList
        cartToItems={cart.getItems()}
        isLoading={isLoading}
        onUpdateCartToItem={onUpdateCartToItem}
        onDeleteCartToItem={onDeleteCartToItem}
      />
      {/*</ListOrNotFoundMessage>*/}
    </section>
  )
}

export default CartItemsListController
