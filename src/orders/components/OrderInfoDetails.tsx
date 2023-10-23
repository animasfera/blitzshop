import { Order } from "db"

import { OrderInfoAddresses } from "src/orders/components/OrderInfoAddresses"
import { OrderInfoPayment } from "src/orders/components/OrderInfoPayment"
import { OrderInfoSummary } from "src/orders/components/OrderInfoSummary"

interface OrderInfoDetailsProps {
  order: Order
}

export const OrderInfoDetails = (props: OrderInfoDetailsProps) => {
  const { order } = props

  return (
    <div className="sm:ml-40 sm:pl-6">
      <h3 className="sr-only">Your information</h3>

      <OrderInfoAddresses order={order} />

      <OrderInfoPayment order={order} />

      <OrderInfoSummary order={order} />
    </div>
  )
}

export default OrderInfoDetails
