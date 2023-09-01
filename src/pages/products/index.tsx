import { Layout } from "src/core/layouts/Layout"
import { Loading } from "src/core/components/Loading"
import { ItemsListController } from "src/items/components/ItemsListController"

export const ProductsPage = () => {
  return (
    <Layout title="Products">
      <Loading>
        <ItemsListController />
      </Loading>
    </Layout>
  )
}

export default ProductsPage
