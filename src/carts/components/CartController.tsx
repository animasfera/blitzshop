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

export const CartController = () => {
  const { t } = useTranslation(["pages.cart"])
  const sessionId = localStorage.getItem("sessionId")

  const [isLoading, setLoading] = useState(false)
  const session = useSession()
  const [cart] = useQuery(getCart, {
    userId: session?.userId ?? undefined,
    sessionId: !session?.userId && sessionId ? sessionId : undefined,
  })
  const [updateCartToItemMutation] = useMutation(updateCartToItem)
  const [deleteCartToItemMutation] = useMutation(deleteCartToItem)

  const handleUpdateCartToItem = async ({ id, qty }: { id: number; qty: number }) => {
    setLoading(true)
    await updateCartToItemMutation({ id, qty })
    await invalidateQuery(getCart)
    setLoading(false)
  }

  const handleDeleteCartToItem = async (id: number) => {
    setLoading(true)
    await deleteCartToItemMutation({ id })
    await invalidateQuery(getCart)
    setLoading(false)
  }

  // TODO: убрать
  /*
  if (!session?.userId)
    return (
      <ErrorSection
        header={{
          statusCode: 401,
          title: t("pages.cart:errors.401.header.title"),
          message: t("pages.cart:errors.401.header.message"),
        }}
        link={{
          href: Routes.LoginPage().href,
          text: t("pages.cart:errors.401.link"),
        }}
      />
    )
    */

  if (!cart || cart?.cartToItems.length === 0)
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
      cart={cart}
      isLoading={isLoading}
      handleUpdateCartToItem={handleUpdateCartToItem}
      handleDeleteCartToItem={handleDeleteCartToItem}
    />
  )
}

export default CartController
