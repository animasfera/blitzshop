import React, { ReactElement, useEffect, useRef } from "react"
import { FiChevronLeft } from "react-icons/fi"
import { Message as MessagePrismaType } from "@prisma/client"
import { Icon } from "@chakra-ui/react"
import moment from "moment"

import Compose from "../Compose"
import Toolbar from "../Toolbar"
import ToolbarButton from "../ToolbarButton"
import Message from "../Message"
import { UserCard } from "src/users/components/UserCard"
import { ChatRoomWithFirstMessage, UserCardProps, UserMain } from "types"

type MessageListProps = {
  chatRoom: ChatRoomWithFirstMessage
  messages: (MessagePrismaType & { sender: UserMain })[]
  senderId: number
  opponent: UserCardProps
  onBackClick?: () => void
}

export const MessageList = (props: MessageListProps) => {
  const { messages, senderId, opponent, chatRoom, onBackClick } = props

  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    //@ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const renderMessages = () => {
    let i = 0
    let messageCount = messages.length
    let tempMessages: ReactElement[] = []

    while (i < messageCount) {
      let previous = messages[i - 1]
      let current = messages[i]!
      let next = messages[i + 1]
      let isMine = current.senderId === senderId
      let currentMoment = moment(current.createdAt)
      let prevBySameAuthor = false
      let nextBySameAuthor = false
      let startsSequence = true
      let endsSequence = true
      let showTimestamp = true

      if (previous) {
        let previousMoment = moment(previous.createdAt)
        let previousDuration = moment.duration(currentMoment.diff(previousMoment))
        prevBySameAuthor = previous.senderId === current.senderId

        if (prevBySameAuthor && previousDuration.as("hours") < 1) {
          startsSequence = false
        }

        if (previousDuration.as("hours") < 1) {
          showTimestamp = false
        }
      }

      if (next) {
        let nextMoment = moment(next.createdAt)
        let nextDuration = moment.duration(nextMoment.diff(currentMoment))
        nextBySameAuthor = next.senderId === current.senderId

        if (nextBySameAuthor && nextDuration.as("hours") < 1) {
          endsSequence = false
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          message={current}
        />
      )

      // Proceed to the next message.
      i += 1
    }

    tempMessages.push(<div ref={messagesEndRef}></div>)

    return tempMessages
  }

  return (
    <div className="message-list">
      <Toolbar
        user={opponent}
        leftItems={[
          <Icon
            w={"42px"}
            h={"42px"}
            pt={"8px"}
            mr={"10px"}
            as={FiChevronLeft}
            key={"bac"}
            onClick={() => onBackClick && onBackClick()}
          />,
          <UserCard key={opponent.id} user={opponent} />,
        ]}
        rightItems={[
          <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
          <ToolbarButton key="video" icon="ion-ios-videocam" />,
          <ToolbarButton key="phone" icon="ion-ios-call" />,
        ]}
      />

      <div className="message-list-container">{renderMessages()}</div>

      <Compose
        senderId={senderId}
        chatRoomId={chatRoom.id}
        // rightItems={[
        //   <ToolbarButton key="photo" icon="ion-ios-camera" />,
        //   <ToolbarButton key="image" icon="ion-ios-image" />,
        //   <ToolbarButton key="audio" icon="ion-ios-mic" />,
        //   <ToolbarButton key="money" icon="ion-ios-card" />,
        //   <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
        //   <ToolbarButton key="emoji" icon="ion-ios-happy" />,
        // ]}
      />
    </div>
  )
}

export default MessageList
