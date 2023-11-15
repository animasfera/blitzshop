import { HeadingSection } from "src/core/tailwind-ui/headings/HeadingSection"
import { AdminOrderListItemSectionList } from "src/orders/components/admin/AdminOrderListItemSectionList"
import { OrderFull } from "../../schemas"

interface AdminOrderListItemSectionProps {
  title?: string
  list: {
    label: string
    value?: string | null
    button?: {
      id: string
      select?: boolean
    }
  }[]
  order: OrderFull
  isLoading: boolean
  handleUpdateOrder: (values: any) => Promise<void>
}

export const AdminOrderListItemSection = (props: AdminOrderListItemSectionProps) => {
  const { title, list, order, isLoading, handleUpdateOrder } = props

  return (
    <section>
      {title && <HeadingSection title={title} />}

      {list && list.length > 0 && (
        <AdminOrderListItemSectionList
          list={list}
          order={order}
          isLoading={isLoading}
          handleUpdateOrder={handleUpdateOrder}
        />
      )}
    </section>
  )
}

export default AdminOrderListItemSection
