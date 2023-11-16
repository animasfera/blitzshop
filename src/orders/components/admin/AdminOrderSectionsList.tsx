import { AdminOrderSectionsListItem } from "src/orders/components/admin/AdminOrderSectionsListItem"
import { OrderFull } from "src/orders/schemas"
import { EditableField } from "./AdminOrder"

interface AdminOrderSectionsListProps {
  sections: {
    title?: string
    list: EditableField[]
  }[]
  order: OrderFull
  isLoading: boolean

  handleUpdateOrder: (values: any) => Promise<void>
}

export const AdminOrderSectionsList = (props: AdminOrderSectionsListProps) => {
  const { sections, isLoading, order, handleUpdateOrder } = props

  return (
    <ul className="space-y-6 xl:w-2/4">
      {sections.map(({ title, list }, index) => (
        <AdminOrderSectionsListItem
          key={`${index}-${title}`}
          title={title}
          list={list}
          order={order}
          isLoading={isLoading}
          handleUpdateOrder={handleUpdateOrder}
        />
      ))}
    </ul>
  )
}

export default AdminOrderSectionsList
