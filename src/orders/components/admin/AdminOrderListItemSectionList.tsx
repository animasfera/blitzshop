import React from "react"
import { OptionSelectField } from "src/core/tailwind-ui/application-ui/forms/Select"

import { AdminOrderListItemSectionListItem } from "src/orders/components/admin/AdminOrderListItemSectionListItem"

interface AdminOrderListItemSectionListProps {
  list: {
    label: string
    value?: string | null
    button?: {
      id: string
      select?: boolean
    }
  }[]
  statusOrder: OptionSelectField
  shippingOptions: OptionSelectField[]
  isLoading: boolean

  handleUpdateOrder: (values: any) => Promise<void>
}

export const AdminOrderListItemSectionList = (props: AdminOrderListItemSectionListProps) => {
  const { list, statusOrder, shippingOptions, isLoading, handleUpdateOrder } = props

  return (
    <dl>
      <ul className="my-2 pb-6 flex flex-col gap-y-2 border-b border-gray-200 text-sm leading-6">
        {list.map(({ label, value, button }) => (
          <AdminOrderListItemSectionListItem
            key={`${value}-${label}`}
            label={label}
            value={value}
            button={button}
            statusOrder={statusOrder}
            shippingOptions={shippingOptions}
            isLoading={isLoading}
            handleUpdateOrder={handleUpdateOrder}
          />
        ))}
      </ul>
    </dl>
  )
}

export default AdminOrderListItemSectionList
