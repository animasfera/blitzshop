import { Order } from "db"

import { OrderItems } from "src/orders/components/OrderItems"
import { OrderDetails } from "src/orders/components/OrderDetails"

interface OrderBodyProps {
  order: Order
}

export const OrderBody = (props: OrderBodyProps) => {
  const { order } = props

  return (
    <section className="mt-10 border-t border-gray-200">
      <h2 className="sr-only">Your order</h2>

      <OrderItems order={order} />
      <OrderDetails order={order} />
    </section>
  )
}

export default OrderBody
