"use client"
import { useTranslation } from "react-i18next"

import Layout from "src/core/layouts/Layout"
import { Loading } from "src/core/components/Loading"
import { OrderInfoController } from "src/orders/components/OrderInfoController"

export const OrderPage = () => {
  const { t } = useTranslation(["pages.orderId"])

  return (
    <Layout title={t("title")}>
      <Loading>
        <OrderInfoController />
      </Loading>
    </Layout>
  )
}

// OrderPage.authenticate = true
export { getServerSideProps } from "src/core/getServerSideProps"
export default OrderPage
