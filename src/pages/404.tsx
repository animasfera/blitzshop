"use client"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useTranslation } from "react-i18next"

import { Layout } from "src/core/layouts/Layout"
import { Loading } from "src/core/components/Loading"
import { ErrorSection } from "src/core/components/sections/Error/ErrorSection"

export const Page404: BlitzPage = () => {
  const { t } = useTranslation(["pages.errors"])

  const statusCode = 404

  return (
    <Layout title={`${statusCode}: ${t("404.header.title")}`}>
      <Loading>
        <ErrorSection
          header={{
            statusCode,
            title: t("404.header.title"),
            message: t("404.header.message"),
          }}
        />
      </Loading>
    </Layout>
  )
}

export default Page404
