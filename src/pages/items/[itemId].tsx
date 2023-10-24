;("use client")
import { useTranslation } from "react-i18next"

import { Layout } from "src/core/layouts/Layout"
import { Loading } from "src/core/components/Loading"

export const ItemPage = () => {
  const { t } = useTranslation(["pages.orderId"])

  return (
    <Layout title={"Item"}>
      <Loading>ItemPage</Loading>
    </Layout>
  )
}

ItemPage.authenticate = true
export { getServerSideProps } from "src/core/getServerSideProps"
export default ItemPage
