"use client"
import { BlitzPage } from "@blitzjs/next"
import { useTranslation } from "react-i18next"

import { Loading } from "src/core/components/Loading"
import { AdminLayout } from "src/core/layouts/AdminLayout"
import { AdminOrdersListController } from "src/orders/components/admin/AdminOrdersListController"

const AdminOrdersPage: BlitzPage = () => {
  const { t } = useTranslation(["pages.admin.orders"])

  return (
    <AdminLayout title={t("title")}>
      <Loading>
        <AdminOrdersListController />
      </Loading>
    </AdminLayout>
  )
}

export { getServerSideProps } from "src/core/getServerSideProps"
export default AdminOrdersPage
