import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Category, Image as ImageDb, ImageToItem, Item, Price, Prisma } from "db"

import { Money } from "src/core/components/Money"

type ProductItem = Item & {
  amount: Price
  category: Category | null
  _count: Prisma.ItemCountOutputType
  coverImage: ImageToItem & {
    image: ImageDb
  }
}

interface ProductProps {
  item: ProductItem
}

const Product = (props: ProductProps) => {
  const { item } = props
  const { id, coverImage, color, title, amount } = item

  return (
    <li className="inline-flex w-64 flex-col text-center lg:w-auto">
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">
          <Image
            src={coverImage.image.url}
            alt={coverImage.image.title ?? ""}
            width={500}
            height={500}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <div className="mt-6">
          {color && <p className="text-sm text-gray-500">{color}</p>}
          <h3 className="mt-1 font-semibold text-gray-900">
            <a
              // TODO: Router
              href={`/product/${id}`}
            >
              <span className="absolute inset-0" />
              {title}
            </a>
          </h3>

          <p className="mt-1 text-gray-900">
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

interface ProductListProps {
  title: string
  link: {
    text: string
    url: string
  }
  items: Array<ProductItem>
}

export const ProductListHorizontalScrolling = (props: ProductListProps) => {
  const { title, link, items } = props

  return (
    <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-32">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
        <h2 id="trending-heading" className="text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>
        <Link
          href={link.url}
          className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
        >
          {link.text}
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>

      <div className="relative mt-8">
        <div className="relative w-full overflow-x-auto">
          <ul
            role="list"
            className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0"
          >
            {items.map((item) => (
              <Product key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 px-4 sm:hidden">
        <Link
          href={link.url}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
        >
          {link.text}
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
    </div>
  )
}

export default ProductListHorizontalScrolling
