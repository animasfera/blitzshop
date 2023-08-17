import { BlitzPage } from "@blitzjs/next"
import { useTranslation } from "react-i18next"

import Layout from "src/core/layouts/Layout"
import React from "react"

const Home: BlitzPage = () => {
  const { t } = useTranslation(["pages.home"])

  return <></>
}
Home.getLayout = (page) => <Layout title={"Home"}>{page}</Layout>

export { getServerSideProps } from "src/core/getServerSideProps"
export default Home
