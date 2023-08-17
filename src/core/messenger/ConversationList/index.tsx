"use client"
import React from "react"
import { Box } from "@chakra-ui/react"

// import ConversationSearch from "../ConversationSearch"
import ConversationListItem from "../ConversationListItem"
// import Toolbar from "../Toolbar"
// import ToolbarButton from "../ToolbarButton"
import { ChatRoomWithFirstMessage } from "types"

type ConversationListProps = {
  senderId: number
  chatRooms: ChatRoomWithFirstMessage[]
  onClick?: (chatRoom: ChatRoomWithFirstMessage) => void
}

export const ConversationList = (props: ConversationListProps) => {
  const { chatRooms, onClick, senderId } = props

  return (
    <Box>
      {/*<Toolbar*/}
      {/*  title="Messenger"*/}
      {/*  leftItems={[<ToolbarButton key="cog" icon="ion-ios-cog" />]}*/}
      {/*  rightItems={[<ToolbarButton key="add" icon="ion-ios-add-circle-outline" />]}*/}
      {/*/>*/}
      {/*<ConversationSearch />*/}
      {chatRooms.map((chatRoom) => (
        <ConversationListItem
          senderId={senderId}
          key={chatRoom.id}
          chatRoom={chatRoom}
          onClick={(chatRoom) => onClick && onClick(chatRoom)}
        />
      ))}
    </Box>
  )
}

export default ConversationList
