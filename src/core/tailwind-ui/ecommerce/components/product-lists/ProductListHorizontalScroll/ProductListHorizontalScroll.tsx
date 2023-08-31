import React from "react"
import Link from "next/link"
import { ItemFull } from "types"

import ProductHorizontalScroll from "./ProductHorizontalScroll"

interface ProductListProps {
  title: string
  link?: { text: string; url: string }
  items: ItemFull[]
}

export const ProductListHorizontalScroll = (props: ProductListProps) => {
  const { title, link, items } = props

  return (
    <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-32">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
        {link && (
          <Link
            href={link.url}
            className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
          >
            {link.text}
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        )}
      </div>

      <div className="relative mt-8">
        <div className="relative w-full overflow-x-auto">
          <ul
            role="list"
            className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0"
          >
            {items.map((item) => (
              <ProductHorizontalScroll key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </div>

      {link && (
        <div className="mt-4 px-4 sm:hidden">
          <Link
            href={link.url}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            {link.text}
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      )}
    </div>
  )
}

export default ProductListHorizontalScroll
