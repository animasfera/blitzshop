import { BlitzPage } from "@blitzjs/next"
import AdminSettingsController from "src/settings/components/admin/AdminSettingsController"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Настройки магазина | Администрирование",
}

const AdminSettingsPage: BlitzPage = () => {
  return (
    <>
      <AdminSettingsController />
    </>
  )
}

export default AdminSettingsPage
