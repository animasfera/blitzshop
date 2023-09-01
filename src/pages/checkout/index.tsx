"use client"
import React from "react"
import { BlitzPage } from "@blitzjs/next"
import { useTranslation } from "react-i18next"

import { Layout } from "src/core/layouts/Layout"
import { Loading } from "src/core/components/Loading"
import { CheckoutController } from "src/checkout/components/CheckoutController"

export const CheckoutPage: BlitzPage = () => {
  const { t } = useTranslation(["pages.checkout"])

  return (
    <Layout title={t("index.title")} styles={"sm:pb-0 lg:pb-0"}>
      <Loading>
        <CheckoutController />
      </Loading>
    </Layout>
  )
}

export { getServerSideProps } from "src/core/getServerSideProps"
export default CheckoutPage
