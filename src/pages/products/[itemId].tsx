import { Layout } from "src/core/layouts/Layout"
import { Loading } from "src/core/components/Loading"
import { ProductController } from "src/items/components/ProductController"

const ProductPage = () => {
  return (
    <Layout title={"Product"}>
      <Loading>
        <ProductController />
      </Loading>
    </Layout>
  )
}

export default ProductPage
