import { PurchasedItem, Category, Item, Image as ImageDb } from "db"

import { AdminOrderSummeryListItem } from "src/orders/components/admin/AdminOrderSummeryListItem"

interface AdminOrderSummeryListProps {
  purchasedItems: (PurchasedItem & {
    category: Category | null
    item: Item & {
      user: {
        email: string
        id: number
        username: string
      } | null
    }
    coverImage: ImageDb
  })[]
}

export const AdminOrderSummeryList = (props: AdminOrderSummeryListProps) => {
  const { purchasedItems } = props

  return (
    <ul role="list" className="divide-y divide-gray-200">
      {purchasedItems.map((item) => (
        <AdminOrderSummeryListItem key={item.id} purchasedItem={item} />
      ))}
    </ul>
  )
}

export default AdminOrderSummeryList
