import { Order } from "db"
import { PurchasedItem } from "@prisma/client"
import { OrderFull } from "../schemas"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { Money } from "src/core/components/Money"
import { useTranslation } from "react-i18next"

interface OrderItemsProps {
  order: OrderFull
}

export const OrderItems = (props: OrderItemsProps) => {
  // TODO: получать только Items
  const { order } = props
  const { t } = useTranslation(["pages.orderId", "item"])

  return (
    <>
      {/*<h3 className="sr-only">Items</h3>*/}
      {order.items.map((item) => (
        <div key={item.id} className="flex space-x-6 border-b border-gray-200 py-10">
          <img
            src={item.coverImage?.url}
            className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
          />
          <div className="flex flex-auto flex-col">
            <div>
              <h4 className="font-medium text-gray-900">
                <Link href={Routes.ItemPage({ itemId: item.id })}>{item.title}</Link>
              </h4>
              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
            </div>
            <div className="mt-6 flex flex-1 items-end">
              <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                <div className="flex">
                  <dt className="font-medium text-gray-900">{t("item:qty")}</dt>
                  <dd className="ml-2 text-gray-700">{item.qty}</dd>
                </div>
                <div className="flex pl-4 sm:pl-6">
                  <dt className="font-medium text-gray-900">{t("item:price")}</dt>
                  <dd className="ml-2 text-gray-700">
                    <Money amount={item.price} currency={item.currency} />
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default OrderItems
