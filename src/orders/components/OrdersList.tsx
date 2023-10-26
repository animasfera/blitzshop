import { Order, Price, ShippingMethod, PurchasedItem, Category, Image, Item } from "db"

import { OrdersListItem } from "src/orders/components/OrdersListItem"
import { OrdersListProductsList } from "src/orders/components/OrdersListProductsList"

interface OrderListProps {
  orders: (Order & {
    user: {
      id: number
      email: string
      username: string
    }
    amount: Price
    shippingMethod: ShippingMethod | null
    purchasedItems: (PurchasedItem & {
      amount: Price
      category: Category | null
      item: Item & {
        user: {
          email: string
          id: number
          username: string
        } | null
      }
      coverImage: Image
    })[]
  })[]
}

export const OrdersList = (props: OrderListProps) => {
  const { orders } = props

  return (
    <div className="mt-12 space-y-16 sm:mt-16">
      {orders.map((order) => (
        <section key={order.id} aria-labelledby={`${order.id}-heading`}>
          <OrdersListItem order={order} />

          <OrdersListProductsList items={order.purchasedItems} />
        </section>
      ))}
    </div>
  )
}

export default OrdersList
