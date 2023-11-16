import Link from "next/link"
import { useTranslation } from "react-i18next"
import { Routes } from "@blitzjs/next"
import { OrderFull } from "../schemas"

interface OrderListItemProps {
  order: OrderFull
}

export const OrdersListItem = (props: OrderListItemProps) => {
  const { order } = props

  const { t } = useTranslation(["pages.orders"])

  return (
    <div className="space-y-1 md:flex md:items-baseline md:space-x-4 md:space-y-0">
      <h2 className="text-lg font-medium text-gray-900 md:flex-shrink-0">
        {t("orders.title", { orderId: order.id })}
      </h2>
      <div className="space-y-5 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 md:min-w-0 md:flex-1">
        <p className="text-sm font-medium text-gray-500">{order.status}</p>
        <div className="flex text-sm font-medium">
          <Link
            href={Routes.OrderPage({ orderId: order.id }).href}
            className="text-indigo-600 hover:text-indigo-500"
          >
            {t("orders.manage")}
          </Link>
          <div className="ml-4 border-l border-gray-200 pl-4 sm:ml-6 sm:pl-6">
            <Link
              href={Routes.OrderPage({ orderId: order.id }).href}
              className="text-indigo-600 hover:text-indigo-500"
            >
              {t("orders.view")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrdersListItem
