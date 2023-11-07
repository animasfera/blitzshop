import React from "react"
import Image from "next/image"
import { Price, CartToItem, Item, ImageToItem, Image as ImageDb } from "db"

import { Money } from "src/core/components/Money"

interface CheckoutOrderItemsListItemProps {
  item: CartToItem & {
    item: Item & {
      amount: Price
      coverImage: ImageToItem & {
        image: ImageDb
      }
    }
  }
}

export const CheckoutOrderItemsListItem = (props: CheckoutOrderItemsListItemProps) => {
  const { item } = props

  return (
    <li className="flex items-start space-x-4 py-6">
      <Image
        src={item.item.coverImage.image.url}
        alt={item.item.coverImage.image.title ?? ""}
        width={200}
        height={200}
        className="h-20 w-20 flex-none rounded-md object-cover object-center"
      />
      <div className="flex-auto space-y-1">
        <h3 className="text-white">{item.item.title}</h3>
        {item.item.color && <p>{item.item.color}</p>}
        {/* <p>{item.item.size}</p> */}
      </div>
      <p className="flex-none text-base font-medium text-white">
        <Money amount={item.item.amount.amount} currency={item.item.amount.currency} />
      </p>
    </li>
  )
}

export default CheckoutOrderItemsListItem
