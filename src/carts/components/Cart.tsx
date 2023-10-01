import { useTranslation } from "react-i18next"
import { Cart as CartDb, CartToItem, Image, ImageToItem, Item, Price } from "db"

import { HeadingPage } from "src/core/tailwind-ui/headings/HeadingPage"
import { CartItemsListController } from "src/carts/components/CartItemsListController"
import { CartOrder } from "src/carts/components/CartOrder"

interface CartProps {
  cart: CartDb & {
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

export const Cart = (props: CartProps) => {
  const { cart, isLoading, handleUpdateCartToItem, handleDeleteCartToItem } = props

  const { t } = useTranslation(["pages.cart"])

  return (
    <div className="mx-auto max-w-2xl pb-12 pt-8 lg:max-w-7xl">
      <HeadingPage title={t("title")} />

      <div className="mt-4 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <CartItemsListController
          cart={cart}
          isLoading={isLoading}
          handleUpdateCartToItem={handleUpdateCartToItem}
          handleDeleteCartToItem={handleDeleteCartToItem}
        />

        <CartOrder cart={cart} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default Cart
