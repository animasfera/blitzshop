import { Box, Flex } from "@chakra-ui/react"
import React, { ReactElement, ReactNode } from "react"

import { HelpMenuItems } from "./HelpMenuItems"

type HelpMenuProps = {
  children: ReactElement | ReactElement[] | ReactNode
}

export const HelpMenu = (props: HelpMenuProps) => {
  const { children } = props

  return (
    <>
      <Flex mt={6} flexDirection={["column", "row"]} width={"100%"}>
        <Box flexShrink={0} width={["100%", "200px"]}>
          <HelpMenuItems />
        </Box>
        <Box flexGrow={1} ml={[0, 10]} mt={[10, 0]}>
          {children}
        </Box>
      </Flex>
    </>
  )
}
