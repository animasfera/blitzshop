import { Order } from "db"

import { OrderInfoItems } from "src/orders/components/OrderInfoItems"
import { OrderInfoDetails } from "src/orders/components/OrderInfoDetails"

interface OrderInfoBodyProps {
  order: Order
}

export const OrderInfoBody = (props: OrderInfoBodyProps) => {
  const { order } = props

  return (
    <section className="mt-10 border-t border-gray-200">
      <h2 className="sr-only">Your order</h2>

      <OrderInfoItems order={order} />
      <OrderInfoDetails order={order} />
    </section>
  )
}

export default OrderInfoBody
