"use client"
import React from "react"
import { BlitzPage } from "@blitzjs/next"
import { useTranslation } from "react-i18next"

import Layout from "src/core/layouts/Layout"
import { Loading } from "src/core/components/Loading"
import { HomeController } from "src/home/components/HomeController"

const Home: BlitzPage = () => {
  const { t } = useTranslation(["pages.home"])

  return (
    <Layout title={t("title")}>
      <Loading>
        <HomeController />
      </Loading>
    </Layout>
  )
}

export { getServerSideProps } from "src/core/getServerSideProps"
export default Home
