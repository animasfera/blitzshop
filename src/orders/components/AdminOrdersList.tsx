import { useTranslation } from "react-i18next"
import { Order, Price, ShippingMethod } from "db"

import { AdminOrdersListItem } from "src/orders/components/AdminOrdersListItem"

interface AdminOrdersListProps {
  orders: (Order & {
    user: { id: number; email: string; username: string }
    amount: Price
    shippingMethod: ShippingMethod | null
  })[]
}

export const AdminOrdersList = (props: AdminOrdersListProps) => {
  const { orders } = props

  const { t } = useTranslation(["pages.admin.orders"])

  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 md:pl-0"
          >
            {t("table.headers.id")}
          </th>
          <th
            scope="col"
            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 xl:table-cell"
          >
            {t("table.headers.createdAt")}
          </th>
          <th
            scope="col"
            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
          >
            {t("table.headers.email")}
          </th>
          <th
            scope="col"
            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
          >
            {t("table.headers.status")}
          </th>

          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            {t("table.headers.amount")}
          </th>
          <th scope="col" className="relative py-3.5 pl-3 pr-4 md:pr-0">
            <span className="sr-only">{t("table.buttons.view")}</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {orders.map((order) => (
          <AdminOrdersListItem key={order.id} order={order} />
        ))}
      </tbody>
    </table>
  )
}

export default AdminOrdersList
