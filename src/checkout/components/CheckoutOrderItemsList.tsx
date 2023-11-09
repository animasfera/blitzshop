import React from "react"

import { CheckoutOrderItemsListItem } from "src/checkout/components/CheckoutOrderItemsListItem"
import { PreOrderItem } from "types"

interface CheckoutOrderItemsListProps {
  items: PreOrderItem[]
}

export const CheckoutOrderItemsList = (props: CheckoutOrderItemsListProps) => {
  const { items } = props

  return (
    <ul role="list" className="divide-y divide-white divide-opacity-10 text-sm font-medium">
      {items.map((item) => (
        <CheckoutOrderItemsListItem key={item.itemId} item={item} currency={"EUR"} />
      ))}
    </ul>
  )
}

export default CheckoutOrderItemsList
