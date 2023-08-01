import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { Category, ImageToItem, Image, Item, Price, Prisma } from "db"

import { CurrenciesEnum } from "src/core/enums/CurrenciesEnum"

interface ProductsListItemProps {
  item: Item & {
    amount: Price
    category: Category | null
    _count: Prisma.ItemCountOutputType
    coverImage: ImageToItem & {
      image: Image
    }
  }
}

export const ProductsListItem = (props: ProductsListItemProps) => {
  const { item } = props

  return (
    <li className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={item.coverImage.image.url}
          alt={item.coverImage.image.title || item.title || ""}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700 m-0">
            <Link href={Routes.ShowItemPage({ itemId: item.id })}>
              <span aria-hidden="true" className="absolute inset-0" />
              {item.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{item.description}</p>
        </div>
        <p className="text-sm font-medium text-gray-900 whitespace-nowrap">
          {item.amount.amount} {CurrenciesEnum[item.amount.currency].symbol}
        </p>
      </div>
    </li>
  )
}
