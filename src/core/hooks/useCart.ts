"use client"
import { invalidateQuery, MutateFunction, useMutation, useQuery } from "@blitzjs/rpc"
import getCart from "src/carts/queries/getCart"
import addItemToCart from "../../cart-to-items/mutations/addItemToCart"
import updateCartToItem from "../../cart-to-items/mutations/updateCartToItem"
import deleteCartToItem from "../../cart-to-items/mutations/deleteCartToItem"
import { Cart, Item, Price, CartToItem, ImageToItem, Image } from "@prisma/client"

export type cartClient = {
  addItem: MutateFunction<Cart, unknown, { itemId: number }, unknown>
  updateItem: MutateFunction<
    CartToItem & { item: Item & { amount: Price }; cart: Cart & { amount: Price } },
    unknown,
    { qty?: number | undefined; id: number },
    unknown
  >
  deleteItem: MutateFunction<CartToItem, unknown, { id: number }, unknown>
  cart: Cart & {
    amount: Price
    cartToItems: (CartToItem & {
      item: Item & { amount: Price; coverImage: ImageToItem & { image: Image } }
    })[]
  }
  reloadCart: () => void
  hasItems: () => boolean
  getItems: () => (CartToItem & {
    item: Item & { amount: Price; coverImage: ImageToItem & { image: Image } }
  })[]
  getTotal: () => number
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
      return cart.cartToItems.length > 0
    },
    getItems: () => {
      return cart.cartToItems
    },
    getTotal: () => {
      let total = 0
      cart.cartToItems.forEach((cartToItem) => {
        total += cartToItem.item.amount.amount * cartToItem.qty
      })
      return total
    },
  }
}
