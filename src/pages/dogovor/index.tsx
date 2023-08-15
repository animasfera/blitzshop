"use client"
import React from "react"
import { BlitzPage } from "@blitzjs/auth"
import { LocaleEnum } from "@prisma/client"

import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/core/hooks/useCurrentUser"

// import DogovorRu from "src/legal/RU/dogovor/oferta.md"
// import DogovorEn from "src/legal/EN/dogovor/oferta.md"

export const DogovorPage: BlitzPage = () => {
  const currentUser = useCurrentUser()

  return (
    <>
      DogovorPage
      {
        // currentUser?.locale === LocaleEnum.RU ? <DogovorRu /> : <DogovorEn />
      }
    </>
  )
}

DogovorPage.getLayout = (page) => <Layout title={"Агентский договор"}>{page}</Layout>
export default DogovorPage
