import Link from "next/link"
import Image from "next/image"
import { Routes } from "@blitzjs/next"
import { useTranslation } from "react-i18next"
import { useMediaQuery } from "react-responsive"
import { PurchasedItem, Category, Item, Image as ImageDb } from "db"

import { Money } from "src/core/components/Money"

interface AdminOrderSummeryListItemProps {
  purchasedItem: PurchasedItem & {
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

export const AdminOrderSummeryListItem = (props: AdminOrderSummeryListItemProps) => {
  const { purchasedItem } = props
  const { id, coverImage, item } = purchasedItem

  const { i18n } = useTranslation(["pages.admin.orderId"])
  const isFullScreen = useMediaQuery({ query: "(min-width: 1100px)" })

  return (
    <li
      key={id}
      className={`flex px-4 py-6 gap-x-4 gap-y-2 xs:flex-col sm:px-6 xl:px-4
      ${isFullScreen ? "xl:flex-row" : "xl:flex-col"} xxl:px-6`}
    >
      <div className="flex-shrink-0">
        <Image
          width={200}
          height={200}
          src={coverImage.url}
          alt={coverImage.title ?? ""}
          className={`w-20 object-cover object-center rounded-md xs:w-full xs:h-32
           sm:max-h-24 sm:h-full md:w-32 md:max-h-36 lg:w-24 lg:max-h-32
           ${isFullScreen ? "xl:w-24 xl:max-h-24" : "xl:w-full xl:h-32"}`}
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex">
          <div className="min-w-0 flex-1 gap-1">
            <h4 className="text-sm">
              <Link
                href={Routes.ItemPage({ itemId: item.id })}
                className="font-medium text-gray-700 hover:text-gray-800"
              >
                {item.title}
              </Link>
            </h4>
            <p className="text-sm text-gray-500">{item.color ?? "color"}</p>
            {item.color && <p className="text-sm text-gray-500">{item.color}</p>}
          </div>

          {/*
              <div className="ml-4 flow-root flex-shrink-0">
                <button
                  type="button"
                  className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Remove</span>
                  <TrashIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              */}
        </div>

        <div className="flex flex-1 items-end justify-between pt-2">
          <p className="mt-1 text-sm font-medium text-gray-900">
            <Money amount={item.price} currency={item.currency} />
          </p>

          {/*
              <div className="ml-4">
                <label htmlFor="quantity" className="sr-only">
                  Quantity
                </label>
                <select
                  id="quantity"
                  name="quantity"
                  className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                </select>
              </div>
              */}
        </div>
      </div>
    </li>
  )
}

export default AdminOrderSummeryListItem
