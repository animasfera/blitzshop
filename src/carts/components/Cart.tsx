import { useTranslation } from "react-i18next"
import { HeadingPage } from "src/core/tailwind-ui/headings/HeadingPage"
import { CartItemsListController } from "src/carts/components/CartItemsListController"
import { CartTotal } from "src/carts/components/CartTotal"
import { cartClient } from "../../core/hooks/useCart"

interface CartProps {
  cart: cartClient
  isLoading: boolean

  onUpdateCartToItem: ({ id, qty }: { id: number; qty: number }) => Promise<void>
  onDeleteCartToItem: (id: number) => Promise<void>
}

export const Cart = (props: CartProps) => {
  const { cart, isLoading, onUpdateCartToItem, onDeleteCartToItem } = props

  const { t } = useTranslation(["pages.cart"])

  return (
    <div className="mx-auto max-w-2xl pb-12 pt-8 lg:max-w-7xl">
      <HeadingPage title={t("title")} />

      <div className="mt-4 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <CartItemsListController
          cart={cart}
          isLoading={isLoading}
          onUpdateCartToItem={onUpdateCartToItem}
          onDeleteCartToItem={onDeleteCartToItem}
        />

        <CartTotal total={cart.getTotal()} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default Cart
