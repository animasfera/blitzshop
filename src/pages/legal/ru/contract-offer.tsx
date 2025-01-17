import Head from "next/head"

import Layout from "src/core/layouts/Layout"
import React from "react"
import Agreement from "src/legal/ru/dogovor/contract-offer.mdx"

export const OfferRuPage = () => {
  return (
    <>
      <Head>
        <title>Политика в отношении обработки персональных данных | Animasfera</title>
      </Head>
      <Agreement />
    </>
  )
}
OfferRuPage.getLayout = (page) => <Layout>{page}</Layout>
export default OfferRuPage
