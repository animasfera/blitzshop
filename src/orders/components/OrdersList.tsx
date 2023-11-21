import { OrdersListItem } from "src/orders/components/OrdersListItem"
import { OrdersListProductsList } from "src/orders/components/OrdersListProductsList"
import { OrderFull } from "../schemas"

interface OrderListProps {
  orders: OrderFull[]
}

export const OrdersList = (props: OrderListProps) => {
  const { orders } = props

  return (
    <div className="mt-12 space-y-16 sm:mt-16">
      {orders.map((order) => (
        <section key={order.id} aria-labelledby={`${order.id}-heading`}>
          <OrdersListItem order={order} />

          <OrdersListProductsList items={order.items} />
        </section>
      ))}
    </div>
  )
}

export default OrdersList
