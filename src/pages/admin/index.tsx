import { BlitzPage } from "@blitzjs/next"
import React from "react"
import AdminLayout from "src/core/layouts/AdminLayout"

const AdminPage: BlitzPage = () => {
  return <>Dashboard</>
}

AdminPage.getLayout = (page) => <AdminLayout title={"Admin Dashboard"}>{page}</AdminLayout>
export default AdminPage
