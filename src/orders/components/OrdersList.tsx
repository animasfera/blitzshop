import { OrdersListItem } from "src/orders/components/OrdersListItem"
import { OrdersListProductsList } from "src/orders/components/OrdersListProductsList"

interface OrderListProps {
  orders: any[]
}

export const OrdersList = (props: OrderListProps) => {
  const { orders } = props

  return (
    <div className="mt-12 space-y-16 sm:mt-16">
      {orders.map((order) => (
        <section key={order.number} aria-labelledby={`${order.number}-heading`}>
          <OrdersListItem order={order} />

          <OrdersListProductsList items={order.products} />
        </section>
      ))}
    </div>
  )
}

export default OrdersList
