import { HeadingSection } from "src/core/tailwind-ui/headings/HeadingSection"
import { AdminOrderFieldsList } from "src/orders/components/admin/AdminOrderFieldsList"
import { OrderFull } from "../../schemas"
import { EditableField } from "./AdminOrder"

interface AdminOrderSectionsListItemProps {
  title?: string
  list: EditableField[]
  order: OrderFull
  isLoading: boolean
  handleUpdateOrder: (values: any) => Promise<void>
}

export const AdminOrderSectionsListItem = (props: AdminOrderSectionsListItemProps) => {
  const { title, list, order, isLoading, handleUpdateOrder } = props

  return (
    <section>
      {title && <HeadingSection title={title} />}

      {list && list.length > 0 && (
        <AdminOrderFieldsList
          list={list}
          order={order}
          isLoading={isLoading}
          handleUpdateOrder={handleUpdateOrder}
        />
      )}
    </section>
  )
}

export default AdminOrderSectionsListItem
