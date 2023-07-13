import React from "react"
import { Box, Heading } from "@chakra-ui/react"

export const Toolbar = (props) => {
  const { title, leftItems, rightItems } = props

  return (
    <Box className="toolbar">
      <Box>{leftItems}</Box>
      <Heading as={"h1"}>{title}</Heading>
      <Box>{rightItems}</Box>
    </Box>
  )
}

export default Toolbar
