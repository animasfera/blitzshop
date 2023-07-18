import React from "react"
import { Box } from "@chakra-ui/react"

import { MessageFormWrapper } from "src/messages/components/MessageFormWrapper"

type ComposeProps = {
  onSubmit?: () => void
  chatRoomId: number
  senderId: number
}

export const Compose = (props: ComposeProps) => {
  const { chatRoomId, senderId, onSubmit } = props
  return (
    <Box className="compose" w={["100%", "calc(100% - 350px)"]}>
      <MessageFormWrapper
        data={{
          roomId: chatRoomId,
          message: "",
          senderId: senderId,
        }}
      />
    </Box>
  )
}

export default Compose
