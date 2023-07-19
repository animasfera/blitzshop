import Head from "next/head"
import { BlitzLayout } from "@blitzjs/next"
import { Box, Container } from "@chakra-ui/react"
import React from "react"

import { HelpMenu } from "./HelpMenu"

const HelpLayout: BlitzLayout<{
  title?: string
  fullscreen?: boolean
  size?: "sm" | "md" | "lg" | "xl" | "xxl" | "full"
}> = ({ title, children, fullscreen, size }) => {
  const CertainContainer = fullscreen ? Box : Container
  console.log("Render: Layout")

  return (
    <CertainContainer
      maxW={!fullscreen ? "container." + (size || "lg") : ""}
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
