import { BlitzPage } from "@blitzjs/next"
import React from "react"

import AdminLayout from "src/core/layouts/AdminLayout"
import { Loading } from "src/core/components/Loading"

const AdminPage: BlitzPage = () => {
  return <Loading>AdminPage</Loading>
}

AdminPage.getLayout = (page) => <AdminLayout title={"admin"}>{page}</AdminLayout>
export default AdminPage
