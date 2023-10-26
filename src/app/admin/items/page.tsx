import { BlitzPage } from "@blitzjs/next"
import AdminItemsController from "src/items/components/admin/AdminItemsController"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Список товаров | Администрирование",
}

const AdminItemsPage: BlitzPage = () => {
  return (
    <>
      <AdminItemsController />
    </>
  )
}

export default AdminItemsPage
