import { useMutation, useQuery } from "@blitzjs/rpc"

import getCart from "src/carts/queries/getCart"
import addItemToCart from "../../cart-to-items/mutations/addItemToCart"
import updateCartToItem from "../../cart-to-items/mutations/updateCartToItem"
import deleteCartToItem from "../../cart-to-items/mutations/deleteCartToItem"

export const useCart = () => {
  const [cart, { refetch }] = useQuery(getCart, {})
  const [addItem] = useMutation(addItemToCart)
  const [updateItem] = useMutation(updateCartToItem)
  const [deleteItem] = useMutation(deleteCartToItem)

  return {
    cart,
    addItem,
    deleteItem,
    updateItem,
    refetch,
  }
}
