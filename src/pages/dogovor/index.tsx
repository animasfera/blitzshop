import React from "react"
import { BlitzPage } from "@blitzjs/auth"
import { LocaleEnum } from "@prisma/client"

import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/core/hooks/useCurrentUser"

// mport DogovorRu from "src/legal/oferta-ru.md"
// import DogovorEn from "src/legal/oferta-en.md"

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
