import { Layout } from "src/core/layouts/Layout"
import { Loading } from "src/core/components/Loading"
import { ProductsListController } from "src/products/components/ProductsListController"

export const ProductsPage = () => {
  return (
    <Layout title="Products">
      <Loading>
        <ProductsListController />
      </Loading>
    </Layout>
  )
}

export default ProductsPage
