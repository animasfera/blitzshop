import { useTranslation } from "react-i18next"

import { Layout } from "src/core/layouts/Layout"
import { Loading } from "src/core/components/Loading"
import { ItemsListController } from "src/items/components/ItemsListController"

export const ProductsPage = () => {
  const { t } = useTranslation(["pages.products"])

  return (
    <Layout title={t("title")}>
      <Loading>
        <ItemsListController />
      </Loading>
    </Layout>
  )
}

export default ProductsPage
