import { BlitzPage, Routes } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"

const ShippingPage: BlitzPage = () => {
  return <></>
}

ShippingPage.authenticate = true
ShippingPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShippingPage
