import Link from "next/link"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import { PurchasedItem, Category, Image as ImageDb, Item, LocaleEnum } from "db"
import { Routes } from "@blitzjs/next"

import { Money } from "src/core/components/Money"

interface OrderListProductsListItemProps {
  item: PurchasedItem & {
    category: Category | null
    item: Item & {
      user: {
        email: string
        id: number
        username: string
      } | null
    }
    coverImage: ImageDb
  }
}

export const OrdersListProductsListItem = (props: OrderListProductsListItemProps) => {
  const { item } = props

  const { t, i18n } = useTranslation(["pages.orders"])

  return (
    <li key={item.id} className="py-6 sm:flex">
      <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
        <Image
          src={item.coverImage.url}
          alt={item.coverImage.title ?? ""}
          width={200}
          height={200}
          className="h-20 w-20 flex-none rounded-md object-cover object-center sm:h-48 sm:w-48"
        />
        <div className="min-w-0 flex-1 pt-1.5 sm:pt-0">
          <h3 className="text-sm font-medium text-gray-900">
            <Link href={Routes.ItemPage({ itemId: item.id })}>{item.title}</Link>
          </h3>
          <p className="truncate text-sm text-gray-500">
            <span>{item.description}</span>{" "}
            {item.category && (
              <span>
                {i18n.language === LocaleEnum.ru ? item.category.titleRu : item.category.titleEn}
              </span>
            )}
          </p>
          <p className="mt-1 font-medium text-gray-900">
            <Money amount={item.price} currency={item.currency} />
          </p>
        </div>
      </div>
      <div className="mt-6 space-y-4 sm:ml-6 sm:mt-0 sm:w-40 sm:flex-none">
        <button
          type="button"
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-2.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-full sm:flex-grow-0"
        >
          {t("items.actions.buy")}
        </button>
        <button
          type="button"
          className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-full sm:flex-grow-0"
        >
          {t("items.actions.shop")}
        </button>
      </div>
    </li>
  )
}

export default OrdersListProductsListItem
