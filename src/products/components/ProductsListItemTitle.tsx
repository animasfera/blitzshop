import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { Item } from "db"

interface ProductsListItemTitleProps {
  item: Item
}

export const ProductsListItemTitle = (props: ProductsListItemTitleProps) => {
  const { item } = props

  return (
    <div>
      <h3 className="text-sm text-gray-700 m-0">
        <Link href={Routes.ShowItemPage({ itemId: item.id })}>
          <span aria-hidden="true" className="absolute inset-0" />
          {item.title}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-gray-500">{item.description}</p>
    </div>
  )
}
