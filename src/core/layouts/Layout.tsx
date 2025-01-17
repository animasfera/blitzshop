import Head from "next/head"
import React, { useEffect } from "react"
import { BlitzLayout } from "@blitzjs/next"

import i18n from "src/core/i18n"
import { Container } from "src/core/tailwind-ui/application-ui/Container"

interface LayoutProps {
  title?: string
  styles?: string
  children?: React.ReactNode
}

export const Layout: BlitzLayout<LayoutProps> = (props) => {
  const { title, styles, children } = props

  useEffect(() => {
    // @ts-ignore
    document.documentElement.lang = i18n.resolvedLanguage?.toUpperCase()
  }, [])

  return (
    <div>
      <Head>
        <title>{title || "shop"}</title>
        <link rel="icon" href="/images/logo.jpg" />
      </Head>

      <main>
        <Container styles={styles}>{children}</Container>
      </main>
    </div>
  )
}

export default Layout
