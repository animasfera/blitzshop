import { Routes } from "@blitzjs/next"
import Link from "next/link"

interface CartItemsListItemTitleProps {
  itemId: number
  title: string
}

export const CartItemsListItemTitle = (props: CartItemsListItemTitleProps) => {
  const { itemId, title } = props

  return (
    <div className="flex justify-between">
      <h3 className="text-sm">
        <Link
          href={`/products/${itemId}`}
          className="font-medium text-gray-700 hover:text-gray-800"
        >
          {title}
        </Link>
      </h3>
    </div>
  )
}

export default CartItemsListItemTitle
