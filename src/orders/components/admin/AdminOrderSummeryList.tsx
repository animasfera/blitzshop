import Link from "next/link"
import Image from "next/image"
import { Routes } from "@blitzjs/next"
import { useTranslation } from "react-i18next"
import { RadioGroup } from "@headlessui/react"
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid"
import {
  Order,
  Price,
  ShippingAddress,
  ShippingMethod,
  PurchasedItem,
  Category,
  Item,
  Image as ImageDb,
  Country,
} from "db"

import { Money } from "src/core/components/Money"
import { HeadingSection } from "src/core/tailwind-ui/headings/HeadingSection"
import { AdminOrderSummeryListItem } from "src/orders/components/admin/AdminOrderSummeryListItem"

interface AdminOrderSummeryListProps {
  purchasedItems: (PurchasedItem & {
    amount: Price
    category: Category | null
    item: Item & {
      amount: Price
      user: {
        email: string
        id: number
        username: string
      } | null
    }
    coverImage: ImageDb
  })[]
}

export const AdminOrderSummeryList = (props: AdminOrderSummeryListProps) => {
  const { purchasedItems } = props

  return (
    <ul role="list" className="divide-y divide-gray-200">
      {purchasedItems.map((item) => (
        <AdminOrderSummeryListItem key={item.id} purchasedItem={item} />
      ))}
    </ul>
  )
}

export default AdminOrderSummeryList
