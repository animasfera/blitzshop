"use client"
import React from "react"
import { BlitzPage } from "@blitzjs/next"
import { useTranslation } from "react-i18next"

import Layout from "src/core/layouts/Layout"
import { Loading } from "src/core/components/Loading"
import { OrdersListController } from "src/orders/components/OrdersListController"

const OrdersPage: BlitzPage = () => {
  const { t } = useTranslation(["pages.orders"])

  return (
    <Layout title={t("index.title")}>
      <Loading>
        <OrdersListController />
      </Loading>
    </Layout>
  )
}

export default OrdersPage