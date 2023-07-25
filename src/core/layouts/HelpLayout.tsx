import React from "react"
import { BlitzLayout } from "@blitzjs/next"
import Head from "next/head"
import { Box, Container } from "@chakra-ui/react"

import { HelpMenu } from "src/help/components/HelpMenu"

const HelpLayout: BlitzLayout<{
  title?: string
  fullscreen?: boolean
  size?: "sm" | "md" | "lg" | "xl" | "xxl" | "full"
}> = ({ title, children, fullscreen, size }) => {
  const CertainContainer = fullscreen ? Box : Container

  return (
    <CertainContainer
      maxWidth={!fullscreen ? "container." + (size || "lg") : ""}
      mt={fullscreen ? 0 : 4}
      mb={fullscreen ? 0 : 6}
    >
      <Head>
        <title>{title || "Leela.Game"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HelpMenu>{children}</HelpMenu>
    </CertainContainer>
  )
}

export default HelpLayout
