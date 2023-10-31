import { BlitzPage } from "@blitzjs/next"
import { Loading } from "src/core/components/Loading"
import { AdminOrdersListController } from "src/orders/components/admin/AdminOrdersListController"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Заказы | Администрирование",
}

const AdminOrdersPage: BlitzPage = () => {
  return (
    <Loading>
      <AdminOrdersListController />
    </Loading>
  )
}

//export { getServerSideProps } from "src/core/getServerSideProps"
export default AdminOrdersPage
