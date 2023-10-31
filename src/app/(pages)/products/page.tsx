"use client"
import { BlitzPage } from "@blitzjs/next"
import { useTranslation } from "react-i18next"

import { Layout } from "src/core/layouts/Layout"
import { Loading } from "src/core/components/Loading"
import { ItemsListController } from "src/items/components/ItemsListController"

const ProductsPage: BlitzPage = () => {
  const { t } = useTranslation(["pages.products"])

  return (
    <Layout title={t("title")} styles={"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"}>
      <Loading>
        <ItemsListController />
      </Loading>
    </Layout>
  )
}

export default ProductsPage
