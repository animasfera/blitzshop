import { useTranslation } from "react-i18next"

interface OrderListItemProps {
  order: any
}

export const OrderListItem = (props: OrderListItemProps) => {
  const { order } = props

  const { t } = useTranslation(["pages.orders"])

  return (
    <div className="space-y-1 md:flex md:items-baseline md:space-x-4 md:space-y-0">
      <h2 className="text-lg font-medium text-gray-900 md:flex-shrink-0">
        {t("orders.title", { orderId: order.number })}
      </h2>
      <div className="space-y-5 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 md:min-w-0 md:flex-1">
        <p className="text-sm font-medium text-gray-500">{order.status}</p>
        <div className="flex text-sm font-medium">
          <a href={order.href} className="text-indigo-600 hover:text-indigo-500">
            {t("orders.manage")}
          </a>
          <div className="ml-4 border-l border-gray-200 pl-4 sm:ml-6 sm:pl-6">
            <a href={order.invoiceHref} className="text-indigo-600 hover:text-indigo-500">
              {t("orders.view")}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderListItem
