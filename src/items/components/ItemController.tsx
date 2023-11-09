import { useState } from "react"
import { useQuery } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"
import { Item } from "src/items/components/Item"
import getItem from "src/items/queries/getItem"
import { useCart } from "../../core/hooks/useCart"

export const ItemController = () => {
  const [isLoading, setLoading] = useState(false)
  const itemId = useParam("itemId", "number")
  const [item] = useQuery(getItem, { id: itemId })
  const cartClient = useCart()

  const onAddProductToCart = async () => {
    setLoading(true)
    await cartClient.addItem({ itemId: item.id })
    await cartClient.reloadCart()
    setLoading(false)
  }

  return <Item item={item} isLoading={isLoading} onAddProductToCart={onAddProductToCart} />
}

export default ItemController
