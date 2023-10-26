"use client"
import { useParams } from "next/navigation"
import { useParam } from "@blitzjs/next"
import { useTranslation } from "react-i18next"
import { Loading } from "src/core/components/Loading"
import { AdminOrderController } from "src/orders/components/admin/AdminOrderController"

const AdminOrderPage = () => {
  const orderId: any = useParams()
  const { t } = useTranslation(["pages.admin.orderId"])

  return (
    <Loading>
      <title>
        {t("heading.title")}+{orderId.orderId}
      </title>
      <AdminOrderController />
    </Loading>
  )
}

AdminOrderPage.authenticate = true
export { getServerSideProps } from "src/core/getServerSideProps"
export default AdminOrderPage
