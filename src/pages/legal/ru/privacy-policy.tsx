import Head from "next/head"

import Layout from "src/core/layouts/Layout"
import React from "react"
import Agreement from "src/legal/ru/privacy-policy.mdx"

export const PrivacyPolicyRuPage = () => {
  return (
    <>
      <Head>
        <title>Политика в отношении обработки персональных данных | Animasfera</title>
      </Head>
      <Agreement />
    </>
  )
}
PrivacyPolicyRuPage.getLayout = (page) => <Layout>{page}</Layout>
export default PrivacyPolicyRuPage
