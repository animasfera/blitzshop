import * as React from "react"
import { Box, HStack, Image } from "@chakra-ui/react"

export const Value = (props) => {
  return (
    <HStack spacing={3} alignItems={"flex-start"}>
      <Image src={"/landing/leaf-small.svg"} />
      <Box>{props.children && props.children}</Box>
    </HStack>
  )
}
