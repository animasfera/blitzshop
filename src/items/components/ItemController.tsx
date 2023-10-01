import { useState } from "react"
import { useSession } from "@blitzjs/auth"
import { useMutation, useQuery, invalidateQuery } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import { Item } from "src/items/components/Item"
import { useCurrency } from "src/core/hooks/useCurrency"
import getItem from "src/items/queries/getItem"
import getCart from "src/carts/queries/getCart"
import addProductToCart from "src/carts/mutations/addProductToCart"

export const ItemController = () => {
  const sessionId = localStorage.getItem("sessionId")

  const [isLoading, setLoading] = useState(false)
  const session = useSession()
  const currency = useCurrency()
  const itemId = useParam("itemId", "number")
  const [item] = useQuery(getItem, { id: itemId })
  const [cart] = useQuery(getCart, {
    userId: session?.userId ?? undefined,
    sessionId: !session?.userId && sessionId ? sessionId : undefined,
  })
  const [addProductToCartMutation] = useMutation(addProductToCart)

  const isExistItem = cart ? cart.cartToItems.some((el) => el.itemId === item.id) : false

  const handleAddProductToCart = async () => {
    setLoading(true)

    const res = await addProductToCartMutation({
      userId: session.userId,
      sessionId: sessionId ?? null,
      itemId: item.id,
      price: {
        amount: item.amount.amount,
        currency: item.amount.currency,
      },
      currency: currency.currency.name,
    })

    if (!session.user && res?.sessionId) {
      localStorage.setItem("sessionId", res.sessionId)
    }

    await invalidateQuery(getCart)

    setLoading(false)
  }

  return (
    <Item
      item={item}
      isExistItem={isExistItem}
      isLoading={isLoading}
      handleAddProductToCart={handleAddProductToCart}
    />
  )
}

export default ItemController
