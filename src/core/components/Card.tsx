import * as React from "react"
import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react"

export const Card = (props: BoxProps) => (
  <Box
    bg={useColorModeValue("white", "gray.700")}
    py="5"
    border={"1px solid " + useColorModeValue("#eee", "#333")}
    px={5}
    shadow={"xl"}
    rounded={7}
    {...props}
  />
)
