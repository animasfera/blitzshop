import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { Item } from "db"

interface ProductsListItemTitleProps {
  item: Item
}

export const ItemsListItemTitle = (props: ProductsListItemTitleProps) => {
  const { item } = props

  return (
    <h3 className="text-sm text-gray-700 m-0">
      <Link href={Routes.ProductPage({ itemId: item.id })}>
        <span aria-hidden="true" className="absolute inset-0" />
        {item.title}
      </Link>
    </h3>
  )
}
