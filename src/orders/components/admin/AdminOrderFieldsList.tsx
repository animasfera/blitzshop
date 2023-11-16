import React from "react"
import { AdminOrderFieldsListItem } from "src/orders/components/admin/AdminOrderFieldsListItem"
import { OrderFull } from "../../schemas"
import { EditableField } from "./AdminOrder"

interface AdminOrderFieldsListProps {
  list: EditableField[]
  order: OrderFull
  isLoading: boolean
  handleUpdateOrder: (values: any) => Promise<void>
}

export const AdminOrderFieldsList = (props: AdminOrderFieldsListProps) => {
  const { list, order, isLoading, handleUpdateOrder } = props

  return (
    <dl>
      <ul className="my-2 pb-6 flex flex-col gap-y-2 border-b border-gray-200 text-sm leading-6">
        {list.map(({ label, value, button }) => (
          <AdminOrderFieldsListItem
            key={`${value}-${label}`}
            label={label}
            value={value}
            button={button}
            order={order}
            isLoading={isLoading}
            handleUpdateOrder={handleUpdateOrder}
          />
        ))}
      </ul>
    </dl>
  )
}

export default AdminOrderFieldsList
