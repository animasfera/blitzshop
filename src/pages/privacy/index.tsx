"use client"
import React from "react"
import { Container } from "@chakra-ui/react"

import Layout from "src/core/layouts/Layout"

// import PrivacyPolicyRu from "src/legal/RU/privacy/privacy.md"
// import PrivacyPolicyEn from "src/legal/EN/privacy/privacy.md"

export const PrivacyPolicyPage = () => {
  return (
    <Container maxWidth={"container.lg"}>
      PrivacyPolicyEn
      {
        // currentUser?.locale === LocaleEnum.ru ? <PrivacyPolicyRu /> : <PrivacyPolicyEn />
      }
    </Container>
  )
}

// PrivacyPolicyPage.getLayout = (page) => <Layout>{page}</Layout>
export default PrivacyPolicyPage
