"use client"
import { BlitzPage } from "@blitzjs/next"
import { useTranslation } from "react-i18next"

import Layout from "src/core/layouts/Layout"
import { Loading } from "src/core/components/Loading"
import { OrderController } from "src/orders/components/OrderController"

export const OrderPage: BlitzPage = () => {
  const { t } = useTranslation(["pages.orderId"])

  return (
    <Layout title={t("title")}>
      <Loading>
        <OrderController />
      </Loading>
    </Layout>
  )
}

OrderPage.authenticate = true
export { getServerSideProps } from "src/core/getServerSideProps"
export default OrderPage
