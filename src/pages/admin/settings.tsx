import { BlitzPage } from "@blitzjs/next"
import React from "react"
import AdminLayout from "src/core/layouts/AdminLayout"

const AdminSettingsPage: BlitzPage = () => {
  return <>Settings</>
}

AdminSettingsPage.getLayout = (page) => <AdminLayout title={"Admin Settings"}>{page}</AdminLayout>
export default AdminSettingsPage
