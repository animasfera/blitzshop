import React, { useState } from "react"
import { Box } from "@chakra-ui/react"

import { Loading } from "src/core/components/Loading"
import { ConversationListController } from "../ConversationListController"
import { MessageListController } from "../MessageListController"
import { ChatRoomWithFirstMessage } from "types"

type MessengerProps = {
  userId: number
}

export const Messenger = (props: MessengerProps) => {
  const { userId } = props
  const [chatRoom, setChatRoom] = useState<ChatRoomWithFirstMessage | undefined>()
  const [activeWindow, setActiveWindow] = useState<"chats" | "messages">("chats")
  return (
    <Box
      className="messenger"
      display={"flex"}
      width={"100%"}
      height={"calc(100vh - 64px)"}
      bg={"#eeeef1"}
    >
      {/* <Toolbar
          title="Messenger"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        /> */}

      {/* <Toolbar
          title="Conversation Title"
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        /> */}

      <Box
        className="scrollable sidebar"
        w={["100%", "350px"]}
        display={[activeWindow === "chats" ? "block" : "none", "block"]}
      >
        <Loading>
          <ConversationListController
            userId={userId}
            onClick={(chatRoom) => {
              setChatRoom(chatRoom)
              setActiveWindow("messages")
            }}
          />
        </Loading>
      </Box>

      <Box
        className="scrollable content"
        flexGrow={1}
        display={[activeWindow === "messages" ? "block" : "none", "block"]}
      >
        <Loading>
          {chatRoom ? (
            <MessageListController
              onBackClick={() => {
                setActiveWindow("chats")
              }}
              senderId={userId}
              chatRoom={chatRoom}
              subscribe={true}
            />
          ) : (
            <Box></Box>
          )}
        </Loading>
      </Box>
    </Box>
  )
}

export default Messenger
