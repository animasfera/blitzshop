"use client"
import React, { useEffect } from "react"
import { useSession } from "@blitzjs/auth"
import { useRouter } from "next/router"
import { useMutation, useQuery } from "@blitzjs/rpc"

import { usePusher } from "src/core/pusher/client"
import getMessages from "src/messages/queries/getMessages"
import chatRoomMarkAsRead from "src/chat-rooms/mutations/chatRoomMarkAsRead"
import { MessageList } from "../MessageList"
import { ChatRoomWithFirstMessage } from "types"

type MessageListControllerProps = {
  chatRoom: ChatRoomWithFirstMessage
  senderId: number
  subscribe?: boolean
  onBackClick?: () => void
}

const ITEMS_PER_PAGE = 30

export const MessageListController = (props: MessageListControllerProps) => {
  const { chatRoom, senderId, subscribe = false, onBackClick } = props
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const session = useSession()

  const opponent = chatRoom.users.map((utc) => utc.user).find((u) => u.id !== senderId)!

  let [{ messages }, { refetch }] = useQuery(getMessages, {
    where: { roomId: chatRoom.id },
    orderBy: { id: "desc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  let { pusher, socketId } = usePusher()

  const [markRead] = useMutation(chatRoomMarkAsRead)

  React.useEffect(() => {
    if (subscribe) {
      var channel = pusher && pusher.subscribe("user-" + session.userId)
      if (channel) {
        channel.unbind("message")
        channel.bind("message", function (data) {
          refetch()
        })
      }
    }
  }, [])

  useEffect(() => {
    markRead({
      id: chatRoom.id,
      // TODO поправить когда будет внедряться
      // @ts-ignore
      lastMessageTimestamp: messages[messages.length - 1].createdAt.valueOf(),
    })
  }, [messages])

  return (
    <>
      <MessageList
        onBackClick={onBackClick}
        chatRoom={chatRoom}
        senderId={senderId}
        opponent={opponent}
        messages={messages}
      />
    </>
  )
}

export default MessageListController
