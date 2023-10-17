"use client"
import { useTranslation } from "react-i18next"

import { Layout } from "src/core/layouts/Layout"
import { Loading } from "src/core/components/Loading"
import { AdminOrderController } from "src/orders/components/AdminOrderController"

export const OrderPage = () => {
  const { t } = useTranslation(["pages.orderId"])

  return (
    <Layout title={t("title")}>
      <Loading>
        <AdminOrderController />
      </Loading>
    </Layout>
  )
}

OrderPage.authenticate = true
export { getServerSideProps } from "src/core/getServerSideProps"
export default OrderPage
