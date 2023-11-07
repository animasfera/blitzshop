import { useState } from "react"
import { useSession } from "@blitzjs/auth"
import { useMutation, useQuery, invalidateQuery } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import { Item } from "src/items/components/Item"
import { useCurrency } from "src/core/hooks/useCurrency"
import getItem from "src/items/queries/getItem"
import getCart from "src/carts/queries/getCart"
import addItemToCart from "src/cart-to-items/mutations/addItemToCart"

export const ItemController = () => {
  const sessionId = localStorage.getItem("sessionId")

  const [isLoading, setLoading] = useState(false)
  const session = useSession()
  const currency = useCurrency()
  const itemId = useParam("itemId", "number")
  const [item] = useQuery(getItem, { id: itemId })
  const [cart] = useQuery(getCart, {})
  const [addProductToCartMutation] = useMutation(addItemToCart)

  const isExistItem = cart ? cart.cartToItems.some((el) => el.itemId === item.id) : false

  const handleAddProductToCart = async () => {
    setLoading(true)

    const res = await addProductToCartMutation({
      itemId: item.id,
    })
    await invalidateQuery(getCart)
    setLoading(false)
  }

  return <Item item={item} isLoading={isLoading} handleAddProductToCart={handleAddProductToCart} />
}

export default ItemController
