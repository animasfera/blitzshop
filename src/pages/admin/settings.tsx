import { BlitzPage } from "@blitzjs/next"
import React from "react"
import AdminLayout from "src/core/layouts/AdminLayout"
import AdminSettingsController from "src/settings/components/admin/AdminSettingsController"

const AdminSettingsPage: BlitzPage = () => {
  return (
    <>
      <AdminSettingsController />
    </>
  )
}

AdminSettingsPage.getLayout = (page) => <AdminLayout title={"Admin Settings"}>{page}</AdminLayout>
export default AdminSettingsPage
