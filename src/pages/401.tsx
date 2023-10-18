"use client"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useTranslation } from "react-i18next"

import { Layout } from "src/core/layouts/Layout"
import { Loading } from "src/core/components/Loading"
import { ErrorSection } from "src/core/components/sections/Error/ErrorSection"

export const Page401: BlitzPage = () => {
  const { t } = useTranslation(["pages.errors"])

  const statusCode = 401

  return (
    <Layout title={`${statusCode}: ${t("401.header.title")}`}>
      <Loading>
        <ErrorSection
          header={{
            statusCode,
            title: t("401.header.title"),
            message: t("401.header.message"),
          }}
          link={{ href: Routes.LoginPage().href, text: t("401.links.signin") }}
        />
      </Loading>
    </Layout>
  )
}

export default Page401
