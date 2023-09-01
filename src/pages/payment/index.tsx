import React from "react"
import { BlitzPage } from "@blitzjs/next"
import { useTranslation } from "react-i18next"

import Layout from "src/core/layouts/Layout"
import Container from "src/core/tailwind-ui/application-ui/Container"

export const PaymentPage: BlitzPage = () => {
  const { t, i18n } = useTranslation(["pages.payment"])

  return (
    <Layout title={t("title")}>
      <Container size={"sm"}>{t("title")}</Container>
    </Layout>
  )
}

export default PaymentPage
