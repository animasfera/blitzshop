import React from "react"
import Link from "next/link"
import { ItemFull } from "types"

import { Product } from "./Product"

interface ProductListProps {
  title: string
  link?: { text: string; url: string }
  items: ItemFull[]
}

export const ProductList = (props: ProductListProps) => {
  const { title, link, items } = props

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="sm:flex sm:items-baseline sm:justify-between">
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

      <ul className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-4">
        {items.map((item) => (
          <Product key={item.id} item={item} />
        ))}
      </ul>

      {link && (
        <div className="mt-6 sm:hidden">
          <Link
            href={link.url}
            className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            {link.text}
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      )}
    </div>
  )
}

export default ProductList

