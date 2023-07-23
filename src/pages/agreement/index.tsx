import React from "react"
import { BlitzPage } from "@blitzjs/auth"
import Head from "next/head"
import { LocaleEnum } from "@prisma/client"

import Layout from "src/core/layouts/Layout"
import { Loading } from "src/core/components/Loading"
import { useCurrentUser } from "src/core/hooks/useCurrentUser"

// import AgreementRu from "src/legal/agreementRu.md"
// import AgreementEn from "src/legal/agreementEn.md"

export const AgreementPage: BlitzPage = () => {
  const currentUser = useCurrentUser()

  return (
    <Loading>
      AgreementPage
      {
        // currentUser?.locale === LocaleEnum.RU ? <AgreementRu /> : <AgreementEn />
      }
    </Loading>
  )
}

AgreementPage.getLayout = (page) => <Layout title="Пользовательское соглашение">{page}</Layout>
export default AgreementPage
