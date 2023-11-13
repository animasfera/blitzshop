import React from "react"
import Image from "next/image"
import { Price, CartToItem, Item, ImageToItem, Image as ImageDb } from "db"

import { Money } from "src/core/components/Money"
import { PreOrderItem } from "types"
import { CurrencyEnum } from "@prisma/client"

interface CheckoutOrderItemsListItemProps {
  item: PreOrderItem
  currency: CurrencyEnum
}

export const CheckoutOrderItemsListItem = (props: CheckoutOrderItemsListItemProps) => {
  const { item, currency } = props

  return (
    <li className="flex items-start space-x-4 py-6">
      {item.imageUrl && (
        <Image
          src={item.imageUrl}
          alt={""}
          width={200}
          height={200}
          className="h-20 w-20 flex-none rounded-md object-cover object-center"
        />
      )}
      <div className="flex-auto space-y-1">
        <h3 className="text-white">{item.title}</h3>
        {/*<p>{item.color}</p>*/}
        {/*<p>{item.size}</p>*/}
      </div>
      <p className="flex-none text-base font-medium text-white">
        <Money amount={item.price} currency={"EUR"} />
      </p>
    </li>
  )
}

export default CheckoutOrderItemsListItem
