import { BlitzPage, Routes } from "@blitzjs/next"
import { useTranslation } from "react-i18next"
import Layout from "src/core/layouts/Layout"
import HeadingPage from "src/core/tailwind-ui/headings/HeadingPage"

const ShippingPage: BlitzPage = () => {
  const { t } = useTranslation(["pages.shipping"])
  return (
    <>
      <HeadingPage title={t("pages.shipping:heading")} />
      <div dangerouslySetInnerHTML={{ __html: t("pages.shipping:body") }}></div>
    </>
  )
}

ShippingPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShippingPage
