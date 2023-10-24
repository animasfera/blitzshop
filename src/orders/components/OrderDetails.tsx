import { Order } from "db"

import { OrderAddresses } from "src/orders/components/OrderAddresses"
import { OrderPayment } from "src/orders/components/OrderPayment"
import { OrderSummary } from "src/orders/components/OrderSummary"

interface OrderDetailsProps {
  order: Order
}

export const OrderDetails = (props: OrderDetailsProps) => {
  const { order } = props

  return (
    <div className="sm:ml-40 sm:pl-6">
      <h3 className="sr-only">Your information</h3>

      <OrderAddresses order={order} />

      <OrderPayment order={order} />

      <OrderSummary order={order} />
    </div>
  )
}

export default OrderDetails
