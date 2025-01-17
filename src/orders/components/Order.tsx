import OrderHead from "src/orders/components/OrderHead"
import OrderBody from "src/orders/components/OrderBody"
import { OrderFull } from "../schemas"
import OrderLogList from "src/order-logs/components/OrderLogList"

interface OrderProps {
  order: OrderFull
  onPayClick?: () => void
}

export const Order = (props: OrderProps) => {
  const { order, onPayClick } = props

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <OrderHead order={order} onPayClick={onPayClick} />
        <OrderLogList orderLogs={order.log} />
        <OrderBody order={order} />
      </div>
    </div>
  )
}

export default Order
