"use client"
import React from "react"
import { useSession } from "@blitzjs/auth"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import { Box, Stack } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

import getMessages from "src/messages/queries/getMessages"
import { usePusher } from "src/core/pusher/client"
import { Message } from "./Message"

const ITEMS_PER_PAGE = 100

export const MessagesList = (props) => {
  const session = useSession({ initialPublicData: props.initialPublicData, suspense: false })
  let { roomId, subscribe } = props

  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ messages, hasMore }, { refetch }] = usePaginatedQuery(getMessages, {
    orderBy: { id: "desc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
    where: {
      roomId: roomId,
    },
  })

  const { t } = useTranslation(["message"])

  const fieldRef = React.useRef<HTMLInputElement>(null)

  let { pusher, socketId } = usePusher()
  React.useEffect(() => {
    if (subscribe) {
      var channel = pusher && pusher.subscribe("user-" + session.userId)
      if (channel) {
        channel.unbind("message")
        channel.bind("message", function (data) {
          refetch()
        })
      }
      if (fieldRef.current) {
        fieldRef.current.scrollIntoView({
          behavior: "smooth",
        })
      }
    }
  }, [])

  const comp = this

  if (!roomId) {
    return <>{t("chooseChat")}</>
  }

  return (
    <Box>
      <Stack spacing={6}>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <Box ref={fieldRef}></Box>
      </Stack>
    </Box>
  )
}
