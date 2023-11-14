"use client"
import React from "react"
import { BlitzPage } from "@blitzjs/next"
import { useTranslation } from "react-i18next"

import { Layout } from "src/core/layouts/Layout"
import { Loading } from "src/core/components/Loading"
import { SettingsMenu } from "src/settings/components/SettingsMenu"

export const SettingsProfilePage: BlitzPage = () => {
  const { t } = useTranslation(["pages.settings"])

  return (
    <Layout title={t("index.title")}>
      <Loading>
        <SettingsMenu>
          <>
            <p>Профиль</p>
          </>
        </SettingsMenu>
      </Loading>
    </Layout>
  )
}

export { getServerSideProps } from "src/core/getServerSideProps"
SettingsProfilePage.authenticate = true

export default SettingsProfilePage
