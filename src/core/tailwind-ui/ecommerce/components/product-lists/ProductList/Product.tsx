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
  const { id, images, color, title, price, currency } = item

  return (
    <li className="group relative inline-flex w-full sm:w-64 flex-col text-center lg:w-auto">
      <div className="w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2 group-hover:opacity-75 sm:h-auto">
        {images[0] && (
          <Image
            src={images[0].image.url}
            alt={images[0].image.title ?? ""}
            width={200}
            height={200}
            className="w-full h-[230px] object-cover object-center"
          />
        )}
      </div>
      <div className="mt-4">
        {color && <p className="mb-1 text-sm text-gray-500">{color}</p>}
        <h3 className="font-semibold text-gray-900">
          <Link
            // TODO: Router
            href={`/products/${id}`}
          >
            <span className="absolute inset-0" />
            {title}
          </Link>
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          <Money amount={price} currency={currency} />
        </p>
      </div>
    </li>
  )
}

export default Product
