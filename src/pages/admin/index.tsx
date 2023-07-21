import { BlitzPage } from "@blitzjs/next"
import React from "react"
import AdminLayout from "src/core/layouts/AdminLayout"

const AdminPage: BlitzPage = (props) => {
  return <>AdminPage</>
}

AdminPage.getLayout = (page) => <AdminLayout title={"admin"}>{page}</AdminLayout>
export default AdminPage
