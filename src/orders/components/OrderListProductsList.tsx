import { OrderListProductsListItem } from "src/orders/components/OrderListProductsListItem"

interface OrderListProductsListProps {
  items: any[]
}

export const OrderListProductsList = (props: OrderListProductsListProps) => {
  const { items } = props

  return (
    <ul className="-mb-6 mt-6 flow-root divide-y divide-gray-200 border-t border-gray-200">
      {items.map((item) => (
        <OrderListProductsListItem key={item.id} item={item} />
      ))}
    </ul>
  )
}

export default OrderListProductsList
