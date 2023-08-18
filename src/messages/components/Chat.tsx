"use client"
import { ChatRoom } from "@prisma/client"

import { MessagesList } from "src/messages/components/MessagesList"
import { MessageFormWrapper } from "src/messages/components/MessageFormWrapper"
import { useCurrentUser } from "src/core/hooks/useCurrentUser"

export const Chat = (props: { chatRoom: ChatRoom; allowSend?: boolean }) => {
  const { chatRoom, allowSend = true } = props
  const user = useCurrentUser()

  return (
    <>
      <MessagesList roomId={chatRoom.id} subscribe={false} flex={"1"} />
      {allowSend && (
        <MessageFormWrapper
          data={{
            roomId: chatRoom.id,
            message: "",
            senderId: user?.id,
          }}
        />
      )}
    </>
  )
}
