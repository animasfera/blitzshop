import React from "react"

import { CheckoutOrderItemsListItem } from "src/checkout/components/CheckoutOrderItemsListItem"
import { CartToItem, Item } from "@prisma/client"
import { CartItemWithItem } from "../../../types"

interface CheckoutOrderItemsListProps {
  items: CartItemWithItem[]
}

export const CheckoutOrderItemsList = (props: CheckoutOrderItemsListProps) => {
  const { items } = props

  return (
    <ul role="list" className="divide-y divide-white divide-opacity-10 text-sm font-medium">
      {items.map((item) => (
        <CheckoutOrderItemsListItem key={item.id} cartItem={item} />
      ))}
    </ul>
  )
}

export default CheckoutOrderItemsList
