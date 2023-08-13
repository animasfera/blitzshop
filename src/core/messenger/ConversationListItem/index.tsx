"use client"
import React, { useEffect } from "react"
import shave from "shave"
import { Avatar, Badge, Box, Heading, Text } from "@chakra-ui/react"

import { ChatRoomWithFirstMessage } from "types"

type ConversationListItemProps = {
  chatRoom: ChatRoomWithFirstMessage
  onClick?: (chatRoom: ChatRoomWithFirstMessage) => void
  senderId: number
}

export const ConversationListItem = (props: ConversationListItemProps) => {
  const { chatRoom, onClick, senderId } = props

  const self = chatRoom.users.find((u) => u.user.id === senderId)!
  const opponent = chatRoom.users.map((utc) => utc.user).find((u) => u.id !== senderId)!

  useEffect(() => {
    shave(".conversation-snippet", 20)
  }, [])

  const data = chatRoom.messages[0]
    ? {
        photo: opponent.avatarUrl,
        name: opponent.username,
        text: chatRoom.messages[0]!.message,
      }
    : {
        photo: "",
        name: "",
        text: "",
      }

  const { photo, name, text } = data

  return (
    <Box onClick={() => onClick && onClick(chatRoom)} position={"relative"} pr={"40px"}>
      <Avatar src={photo} size={"md"} mr={2} />
      <Box>
        <Heading as="h1">{name}</Heading>
        <Text className="conversation-snippet">{text}</Text>
        {self.numUnread > 0 && (
          <Badge
            variant="solid"
            colorScheme="red"
            fontSize={"9px"}
            lineHeight={"14px"}
            p={"1px 6px"}
            position={"absolute"}
            right={"10px"}
            top={"50%"}
            transform={"translateY(-50%)"}
          >
            {self.numUnread}
          </Badge>
        )}
      </Box>
    </Box>
  )
}

export default ConversationListItem
