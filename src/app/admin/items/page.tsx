"use client"
import { BlitzPage } from "@blitzjs/next"
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
AdminItemsPage.authenticate = { role: "ADMIN" }

export default AdminItemsPage
