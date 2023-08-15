"use client"
import { MessagesList } from "src/messages/components/MessagesList"
import { MessageFormWrapper } from "src/messages/components/MessageFormWrapper"
import { useCurrentUser } from "src/core/hooks/useCurrentUser"

export const Messages = (props) => {
  const { chatRoom } = props
  const user = useCurrentUser()

  return (
    <>
      <MessagesList roomId={chatRoom.id} subscribe={false} flex={"1"} />
      <MessageFormWrapper
        data={{
          roomId: chatRoom.id,
          message: "",
          senderId: user?.id,
        }}
      />
    </>
  )
}
