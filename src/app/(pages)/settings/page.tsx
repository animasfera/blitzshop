"use client"
import React from "react"
import { BlitzPage } from "@blitzjs/next"
import { useTranslation } from "react-i18next"

import { Layout } from "src/core/layouts/Layout"
import { Loading } from "src/core/components/Loading"
import { SettingsUserController } from "src/settings/components/SettingsUserController"

const SettingsPage: BlitzPage = () => {
  const { t } = useTranslation(["pages.settings"])

  return (
    <Layout title={t("index.title")}>
      <Loading>
        <SettingsUserController />
      </Loading>
    </Layout>
  )
}

//export { getServerSideProps } from "src/core/getServerSideProps"
export default SettingsPage
