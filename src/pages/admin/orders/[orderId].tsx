"use client"
import { BlitzPage, useParam } from "@blitzjs/next"
import { useTranslation } from "react-i18next"

import { AdminLayout } from "src/core/layouts/AdminLayout"
import { Loading } from "src/core/components/Loading"
import { AdminOrderController } from "src/orders/components/admin/AdminOrderController"

export const AdminOrderPage: BlitzPage = () => {
  const orderId = useParam("orderId", "number")
  const { t } = useTranslation(["pages.admin.orderId"])

  return (
    <AdminLayout title={t("heading.title", { orderId })}>
      <Loading>
        <AdminOrderController />
      </Loading>
    </AdminLayout>
  )
}

AdminOrderPage.authenticate = true
export { getServerSideProps } from "src/core/getServerSideProps"
export default AdminOrderPage
