import { Order } from "db"

import OrderInfoHead from "src/orders/components/OrderInfoHead"
import OrderInfoBody from "src/orders/components/OrderInfoBody"

interface OrderInfoProps {
  order: Order
}

export const OrderInfo = (props: OrderInfoProps) => {
  const { order } = props

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <OrderInfoHead order={order} />

        <OrderInfoBody order={order} />
      </div>
    </div>
  )
}

export default OrderInfo
