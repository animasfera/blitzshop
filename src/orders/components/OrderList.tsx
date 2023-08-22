import { OrderListItem } from "src/orders/components/OrderListItem"
import { OrderListProductsList } from "src/orders/components/OrderListProductsList"

interface OrderListProps {
  orders: any[]
}

export const OrderList = (props: OrderListProps) => {
  const { orders } = props

  return (
    <div className="mt-12 space-y-16 sm:mt-16">
      {orders.map((order) => (
        <section key={order.number} aria-labelledby={`${order.number}-heading`}>
          <OrderListItem order={order} />

          <OrderListProductsList items={order.products} />
        </section>
      ))}
    </div>
  )
}

export default OrderList
