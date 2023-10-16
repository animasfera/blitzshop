import React from "react"
import Image from "next/image"

import { Money } from "src/core/components/Money"
import { CartToItem, Item } from "@prisma/client"
import { CartItemWithItem } from "../../../types"

interface CheckoutOrderItemsListItemProps {
  cartItem: CartItemWithItem
}

export const CheckoutOrderItemsListItem = (props: CheckoutOrderItemsListItemProps) => {
  const { cartItem } = props

  return (
    <li className="flex items-start space-x-4 py-6">
      {cartItem.item.images[0] && (
        <Image
          src={cartItem.item.images[0].image.url}
          alt={cartItem.item.images[0].image.title || ""}
          width={200}
          height={200}
          className="h-20 w-20 flex-none rounded-md object-cover object-center"
        />
      )}
      <div className="flex-auto space-y-1">
        <h3 className="text-white">{cartItem.item.title}</h3>
        <p>{cartItem.item.color}</p>
        {/*<p>{cartItem.item.size}</p>*/}
      </div>
      <p className="flex-none text-base font-medium text-white">
        <Money amount={cartItem.item.price} currency={cartItem.item.currency} />
      </p>
    </li>
  )
}

export default CheckoutOrderItemsListItem
