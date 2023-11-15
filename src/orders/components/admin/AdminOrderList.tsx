import { useTranslation } from "react-i18next"

import { OptionSelectField } from "src/core/tailwind-ui/application-ui/forms/Select"
import { AdminOrderListItemSection } from "src/orders/components/admin/AdminOrderListItemSection"
import { OrderFull } from "src/orders/schemas"

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
  order: OrderFull
  isLoading: boolean

  handleUpdateOrder: (values: any) => Promise<void>
}

export const AdminOrderList = (props: AdminOrderListProps) => {
  const { sections, isLoading, order, handleUpdateOrder } = props

  return (
    <ul className="space-y-6 xl:w-2/4">
      {sections.map(({ title, list }, index) => (
        <AdminOrderListItemSection
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

export default AdminOrderList
