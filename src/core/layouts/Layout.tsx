import Head from "next/head"
import React, { useEffect, FC } from "react"
import { BlitzLayout } from "@blitzjs/next"
import { Box, Container } from "@chakra-ui/react"

import { Loading } from "src/core/components/Loading"
import i18n from "../i18n"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
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

      <Container>{children}</Container>
    </Box>
  )
}

export default Layout
