import { invalidateQuery, MutateFunction, useMutation, useQuery } from "@blitzjs/rpc"

import getCart from "src/carts/queries/getCart"
import addItemToCart from "../../cart-to-items/mutations/addItemToCart"
import updateCartToItem from "../../cart-to-items/mutations/updateCartToItem"
import deleteCartToItem from "../../cart-to-items/mutations/deleteCartToItem"
import { Cart, Item, CartToItem, ImageToItem, Image } from "@prisma/client"
import { CartItemWithItem } from "../../../types"

export type cartClient = {
  addItem: MutateFunction<Cart, unknown, { itemId: number }, unknown>
  updateItem: MutateFunction<
    CartToItem & { item: Item; cart: Cart },
    unknown,
    { qty?: number | undefined; id: number },
    unknown
  >
  deleteItem: MutateFunction<CartToItem, unknown, { id: number }, unknown>
  cart: Cart & {
    cartToItems: (CartToItem & {
      item: Item & { images: (ImageToItem & { image: Image })[] }
    })[]
  }
  reloadCart: () => void
  hasItems: () => boolean
  getItems: () => CartItemWithItem[]

  getTotal: () => number
  getWeight: () => number
}

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
    reloadCart: () => {
      invalidateQuery(getCart)
    },
    hasItems: () => {
      return cart ? cart.cartToItems.length > 0 : false
    },
    getItems: () => {
      return cart ? cart.cartToItems : []
    },
    getTotal: () => {
      let total = 0
      cart?.cartToItems.forEach((cartToItem) => {
        total += cartToItem.item.price * cartToItem.qty
      })
      return total
    },
    getWeight: () => {
      let weight = 0
      cart?.cartToItems.forEach((cartToItem) => {
        weight += cartToItem.item.weight
      })
      return weight
    },
  }
}
