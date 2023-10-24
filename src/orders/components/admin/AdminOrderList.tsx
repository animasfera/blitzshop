import { useTranslation } from "react-i18next"

import { OptionSelectField } from "src/core/tailwind-ui/application-ui/forms/Select"
import { AdminOrderListItemSection } from "src/orders/components/admin/AdminOrderListItemSection"

interface AdminOrderListProps {
  sections: {
    title?: string
    list: {
      label: string
      value?: string | null
      button?: {
        id?: string
        select?: boolean
        text: string
      }
    }[]
  }[]
  statusOrder: OptionSelectField
  shippingOptions: OptionSelectField[]
}

export const AdminOrderList = (props: AdminOrderListProps) => {
  const { sections, statusOrder, shippingOptions } = props

  return (
    <ul className="space-y-6">
      {sections.map(({ title, list }, index) => (
        <AdminOrderListItemSection
          key={`${index}-${title}`}
          title={title}
          list={list}
          statusOrder={statusOrder}
          shippingOptions={shippingOptions}
        />
      ))}
    </ul>
  )
}

export default AdminOrderList
