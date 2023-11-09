import { useTranslation } from "react-i18next"

import { Money } from "src/core/components/Money"
import { Order } from "@prisma/client"

interface AdminOrderSummeryPriceProps {
  order: Order
}

export const AdminOrderSummeryPrice = (props: AdminOrderSummeryPriceProps) => {
  const { order } = props

  const { t } = useTranslation(["pages.admin.orderId"])

  return (
    <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between">
        <dt className="text-sm">Subtotal</dt>
        <dd className="text-sm font-medium text-gray-900">
          <Money amount={order.subtotal} currency={order.currency} />
        </dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-sm">Shipping</dt>
        <dd className="text-sm font-medium text-gray-900">
          <Money amount={order.shippingFee} currency={order.currency} />
        </dd>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        <dt className="text-base font-medium">Total</dt>
        <dd className="text-base font-medium text-gray-900">
          <Money amount={order.total} currency={order.currency} />
        </dd>
      </div>
    </dl>
  )
}

export default AdminOrderSummeryPrice
