import { useState } from "react"
import { useSession } from "@blitzjs/auth"
import { useQuery, useMutation, invalidateQuery } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { useTranslation } from "react-i18next"

import { ErrorSection } from "src/core/components/sections/Error/ErrorSection"
import { Cart } from "src/carts/components/Cart"
import getCart from "src/carts/queries/getCart"
import updateCartToItem from "src/cart-to-items/mutations/updateCartToItem"
import deleteCartToItem from "src/cart-to-items/mutations/deleteCartToItem"
import { useCart } from "../../core/hooks/useCart"

export const CartController = () => {
  const { t } = useTranslation(["pages.cart"])

  const [isLoading, setLoading] = useState(false)
  const cartClient = useCart()

  const onUpdateCartToItem = async ({ id, qty }: { id: number; qty: number }) => {
    setLoading(true)
    await cartClient.updateItem({ id, qty })
    await cartClient.reloadCart()
    setLoading(false)
  }

  const onDeleteCartToItem = async (id: number) => {
    setLoading(true)
    await cartClient.deleteItem({ id })
    await cartClient.reloadCart()
    setLoading(false)
  }

  if (!cartClient.cart || !cartClient.hasItems())
    return (
      <ErrorSection
        header={{
          statusCode: 404,
          title: t("pages.cart:errors.404.header.title"),
          message: t("pages.cart:errors.404.header.message"),
        }}
      />
    )

  return (
    <Cart
      cart={cartClient}
      isLoading={isLoading}
      onUpdateCartToItem={onUpdateCartToItem}
      onDeleteCartToItem={onDeleteCartToItem}
    />
  )
}

export default CartController
