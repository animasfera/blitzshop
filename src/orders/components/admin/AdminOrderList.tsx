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
        id: string
        select?: boolean
      }
    }[]
  }[]
  statusOrder: OptionSelectField
  shippingOptions: OptionSelectField[]
  isLoading: boolean

  handleUpdateOrder: (values: any) => Promise<void>
}

export const AdminOrderList = (props: AdminOrderListProps) => {
  const { sections, statusOrder, shippingOptions, isLoading, handleUpdateOrder } = props

  return (
    <ul className="space-y-6 xl:w-2/4">
      {sections.map(({ title, list }, index) => (
        <AdminOrderListItemSection
          key={`${index}-${title}`}
          title={title}
          list={list}
          statusOrder={statusOrder}
          shippingOptions={shippingOptions}
          isLoading={isLoading}
          handleUpdateOrder={handleUpdateOrder}
        />
      ))}
    </ul>
  )
}

export default AdminOrderList
