import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ItemFull } from "types"

import { Money } from "src/core/components/Money"

interface ProductProps {
  item: ItemFull
}

export const Product = (props: ProductProps) => {
  const { item } = props
  const { id, coverImage, title, amount } = item

  return (
    <li className="group relative">
      <div className="w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2 group-hover:opacity-75 sm:h-auto">
        <Image
          src={coverImage.image.url}
          alt={coverImage.image.title ?? ""}
          width={200}
          height={200}
          className="w-full h-[230px] object-cover object-center"
        />
      </div>
      <h3 className="mt-4 text-base font-semibold text-gray-900">
        <Link
          // TODO: Router
          href={`/product/${id}`}
        >
          <span className="absolute inset-0" />
          {title}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        <Money amount={amount.amount} currency={amount.currency} />
      </p>
    </li>
  )
}

export default Product
