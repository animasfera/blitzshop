"use client"
import React from "react"
import { BlitzPage } from "@blitzjs/next"
import { useTranslation } from "react-i18next"

import Layout from "src/core/layouts/Layout"
import { Loading } from "src/core/components/Loading"
import { OrderListController } from "src/orders/components/OrderListController"

export const OrdersPage: BlitzPage = () => {
  const { t } = useTranslation(["pages.orders"])

  return (
    <Layout title={t("index.title")}>
      <Loading>
        <OrderListController />
      </Loading>
    </Layout>
  )
}

export { getServerSideProps } from "src/core/getServerSideProps"
export default OrdersPage
