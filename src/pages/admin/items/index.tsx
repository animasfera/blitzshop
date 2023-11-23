import { BlitzPage } from "@blitzjs/next"
import { UserRoleEnum } from "@prisma/client"

import AdminLayout from "src/core/layouts/AdminLayout"
import AdminItemsController from "src/items/components/admin/AdminItemsController"

const AdminItemsPage: BlitzPage = () => {
  return (
    <>
      <AdminItemsController />
    </>
  )
}

AdminItemsPage.getLayout = (page) => (
  <AdminLayout title={"Товары | Администрирование"}>{page}</AdminLayout>
)
AdminItemsPage.authenticate = { role: UserRoleEnum.ADMIN, redirectTo: "/" }

export default AdminItemsPage
