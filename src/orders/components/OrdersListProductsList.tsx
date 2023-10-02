import { OrdersListProductsListItem } from "src/orders/components/OrdersListProductsListItem"

interface OrderListProductsListProps {
  items: any[]
}

export const OrdersListProductsList = (props: OrderListProductsListProps) => {
  const { items } = props

  return (
    <ul className="-mb-6 mt-6 flow-root divide-y divide-gray-200 border-t border-gray-200">
      {items.map((item) => (
        <OrdersListProductsListItem key={item.id} item={item} />
      ))}
    </ul>
  )
}

export default OrdersListProductsList
