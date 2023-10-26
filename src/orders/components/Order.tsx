import { Order as OrderDb } from "db"

import OrderHead from "src/orders/components/OrderHead"
import OrderBody from "src/orders/components/OrderBody"

interface OrderProps {
  order: OrderDb
}

export const Order = (props: OrderProps) => {
  const { order } = props

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <OrderHead order={order} />

        <OrderBody order={order} />
      </div>
    </div>
  )
}

export default Order
