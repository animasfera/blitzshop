import { Layout } from "src/core/layouts/Layout"
import { Loading } from "src/core/components/Loading"
import { ProductController } from "src/products/components/ProductController"

const ProductPage = () => {
  return (
    <Layout title={"Product"}>
      <Loading fallback={<div>Loading...</div>}>
        <ProductController />
      </Loading>
    </Layout>
  )
}

export default ProductPage
