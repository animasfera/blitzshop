"use client"
import { Cart } from "./Cart"
import { useQuery } from "@blitzjs/rpc"
import getCart from "../queries/getCart"

export const CartController = ({ userId }: { userId: number }) => {
  // const [cart] = useQuery(getCart, { userId })
  return (
    <>
      <Cart />
    </>
  )
}
