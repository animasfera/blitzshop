import { OrderItems } from "src/orders/components/OrderItems"
import { OrderDetails } from "src/orders/components/OrderDetails"
import { OrderFull } from "../schemas"

interface OrderBodyProps {
  order: OrderFull
}

export const OrderBody = (props: OrderBodyProps) => {
  const { order } = props

  return (
    <section className="mt-10 border-t border-gray-200">
      <OrderItems order={order} />
      <OrderDetails order={order} />
    </section>
  )
}

export default OrderBody
