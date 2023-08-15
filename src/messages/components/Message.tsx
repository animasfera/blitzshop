"use client"
import { Avatar, Box, Flex } from "@chakra-ui/react"
import React from "react"

import { DateWithTime } from "src/core/components/Date"

export const Message = (props) => {
  const { message } = props
  return (
    <Flex>
      <Box width={"40px"} flexBasis={"40px"} flexShrink={0}>
        <Avatar src={message.sender.avatarUrl} size={"sm"} />
      </Box>
      <Box flexGrow={1}>
        <Box as={"b"}>{message.sender.username}</Box>
        <Box>{message.message}</Box>
      </Box>
      <Box fontSize={"xs"}>
        <DateWithTime date={message.createdAt} relative={true} />
      </Box>
    </Flex>
  )
}
