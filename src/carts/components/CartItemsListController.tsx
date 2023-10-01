import { usePaginatedQuery } from "@blitzjs/rpc"
import { Cart, CartToItem, Image, ImageToItem, Item, Price } from "db"

import { ListOrNotFoundMessage } from "src/core/components/ListOrNotFoundMessage"
import { CartItemsList } from "src/carts/components/CartItemsList"
import { usePagination } from "src/core/hooks/usePagination"
import getCartToItems from "src/cart-to-items/queries/getCartToItems"

interface CartItemsListControllerProps {
  cart: Cart & {
    amount: Price
    cartToItems: (CartToItem & {
      item: Item & {
        amount: Price
        coverImage: ImageToItem & { image: Image }
      }
    })[]
  }
  isLoading: boolean

  handleUpdateCartToItem: ({ id, qty }: { id: number; qty: number }) => Promise<void>
  handleDeleteCartToItem: (id: number) => Promise<void>
}

const ITEMS_PER_PAGE = 2

export const CartItemsListController = (props: CartItemsListControllerProps) => {
  const { cart, isLoading, handleUpdateCartToItem, handleDeleteCartToItem } = props

  const pagination = usePagination()
  const [{ cartToItems, hasMore, count }] = usePaginatedQuery(getCartToItems, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * pagination.page,
    take: ITEMS_PER_PAGE,
    where: { cartId: cart.id },
  })

  return (
    <section aria-labelledby="cart-heading" className="lg:col-span-7">
      <h2 id="cart-heading" className="sr-only">
        Items in your shopping cart
      </h2>

      <ListOrNotFoundMessage
        countObjects={count} //
        itemsPerPage={ITEMS_PER_PAGE}
        pagination={pagination}
        hasMore={hasMore}
      >
        <CartItemsList
          cartToItems={cartToItems ?? 0}
          isLoading={isLoading}
          handleUpdateCartToItem={handleUpdateCartToItem}
          handleDeleteCartToItem={handleDeleteCartToItem}
        />
      </ListOrNotFoundMessage>
    </section>
  )
}

export default CartItemsListController
