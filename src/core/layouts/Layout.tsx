import Head from "next/head"
import React, { useEffect, FC } from "react"
import { BlitzLayout } from "@blitzjs/next"
import { Box } from "@chakra-ui/react"

import { Loading } from "src/core/components/Loading"
import i18n from "../i18n"
import Container from "../tailwind-ui/application-ui/Container"

export const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  useEffect(() => {
    // @ts-ignore
    document.documentElement.lang = i18n.resolvedLanguage?.toUpperCase()
  }, [])

  return (
    <Box>
      <Head>
        <title>{title || "shop"}</title>
        {
          // <link rel="icon" href="/favicon.ico" />
        }
      </Head>

      <div className={"pb-12"}>
        <Container>{children}</Container>
      </div>
    </Box>
  )
}

export default Layout
