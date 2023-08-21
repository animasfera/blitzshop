import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ItemFull } from "types"

import { Money } from "src/core/components/Money"

interface ProductProps {
  item: ItemFull
}

export const ProductHorizontalScroll = (props: ProductProps) => {
  const { item } = props
  const { id, coverImage, color, title, amount } = item

  return (
    <li className="inline-flex w-64 flex-col text-center lg:w-auto">
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">
          <Image
            src={coverImage.image.url}
            alt={coverImage.image.title ?? ""}
            width={200}
            height={200}
            className="w-full h-[230px] object-cover object-center group-hover:opacity-75"
          />
        </div>
        <div className="mt-4">
          {color && <p className="mb-1 text-sm text-gray-500">{color}</p>}
          <h3 className="font-semibold text-gray-900">
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
        </div>
      </div>

      {/*
                <h4 className="sr-only">Available colors</h4>
                <ul role="list" className="mt-auto flex items-center justify-center space-x-3 pt-6">
                    {product.availableColors.map((color) => (
                    <li
                      key={color.name}
                      className="h-4 w-4 rounded-full border border-black border-opacity-10"
                      style={{ backgroundColor: color.colorBg }}
                    >
                      <span className="sr-only">{color.name}</span>
                    </li>
                  ))

                </ul>
                */}
    </li>
  )
}

export default ProductHorizontalScroll
