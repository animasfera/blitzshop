import React from "react"
import Image from "next/image"

import { Money } from "src/core/components/Money"

interface CheckoutOrderItemsListItemProps {
  item: any
}

export const CheckoutOrderItemsListItem = (props: CheckoutOrderItemsListItemProps) => {
  const { item } = props

  return (
    <li className="flex items-start space-x-4 py-6">
      <Image
        src={item.imageSrc}
        alt={item.imageAlt}
        width={200}
        height={200}
        className="h-20 w-20 flex-none rounded-md object-cover object-center"
      />
      <div className="flex-auto space-y-1">
        <h3 className="text-white">{item.name}</h3>
        <p>{item.color}</p>
        <p>{item.size}</p>
      </div>
      <p className="flex-none text-base font-medium text-white">
        <Money
          // item.price
          amount={21000}
          currency={"USD"}
        />
      </p>
    </li>
  )
}

export default CheckoutOrderItemsListItem
