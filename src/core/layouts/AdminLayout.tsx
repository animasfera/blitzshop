import Head from "next/head"
import React, { useEffect, FC } from "react"
import { BlitzLayout } from "@blitzjs/next"

import { Container } from "src/core/tailwind-ui/application-ui/Container"
import i18n from "../i18n"

interface LayoutProps {
  title?: string
  styles?: string
  children?: React.ReactNode
}

export const AdminLayout: BlitzLayout<LayoutProps> = (props) => {
  const { title, styles, children } = props

  useEffect(() => {
    // @ts-ignore
    document.documentElement.lang = i18n.resolvedLanguage?.toUpperCase()
  }, [])

  return (
    <div>
      <Head>
        <title>{title || "shop"}</title>
        <link rel="icon" href="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" />
      </Head>

      <main>
        {
          // TODO: add AdminSidebar
        }
        <Container styles={styles}>{children}</Container>
      </main>
    </div>
  )
}

AdminLayout.authenticate = true
export default AdminLayout
