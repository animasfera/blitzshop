import React from "react"
import { Price, CartToItem, Item, ImageToItem, Image } from "db"

import { CheckoutOrderItemsListItem } from "src/checkout/components/CheckoutOrderItemsListItem"

interface CheckoutOrderItemsListProps {
  items: (CartToItem & {
    item: Item & {
      amount: Price
      coverImage: ImageToItem & {
        image: Image
      }
    }
  })[]
}

export const CheckoutOrderItemsList = (props: CheckoutOrderItemsListProps) => {
  const { items } = props

  return (
    <ul role="list" className="divide-y divide-white divide-opacity-10 text-sm font-medium">
      {items.map((item) => (
        <CheckoutOrderItemsListItem key={item.id} item={item} />
      ))}
    </ul>
  )
}

export default CheckoutOrderItemsList
