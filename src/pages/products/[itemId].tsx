import { Layout } from "src/core/layouts/Layout"
import { Loading } from "src/core/components/Loading"
import { ItemController } from "src/items/components/ItemController"

const ProductPage = () => {
  return (
    <Layout title={"Product"}>
      <Loading>
        <ItemController />
      </Loading>
    </Layout>
  )
}

export default ProductPage
