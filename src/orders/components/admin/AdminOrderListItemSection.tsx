import { OptionSelectField } from "src/core/tailwind-ui/application-ui/forms/Select"
import { HeadingSection } from "src/core/tailwind-ui/headings/HeadingSection"
import { AdminOrderListItemSectionList } from "src/orders/components/admin/AdminOrderListItemSectionList"

interface AdminOrderListItemSectionProps {
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
  statusOrder: OptionSelectField
  shippingOptions: OptionSelectField[]
}

export const AdminOrderListItemSection = (props: AdminOrderListItemSectionProps) => {
  const { title, list, statusOrder, shippingOptions } = props

  return (
    <section>
      {title && <HeadingSection title={title} />}

      {list && list.length > 0 && (
        <AdminOrderListItemSectionList
          list={list}
          statusOrder={statusOrder}
          shippingOptions={shippingOptions}
        />
      )}
    </section>
  )
}

export default AdminOrderListItemSection
