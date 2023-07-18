import React from "react"
import { DateTime } from "luxon"
import { Message as MessagePrismaType } from "@prisma/client"
import { Box } from "@chakra-ui/react"

import { DateWithTime } from "src/core/components/Date"
import { nl2br } from "src/core/helpers/Helpers"

type MessageProps = {
  message: MessagePrismaType
  isMine: boolean
  startsSequence: boolean
  endsSequence: boolean
  showTimestamp: boolean
}

export const Message = (props: MessageProps) => {
  const { message, isMine, startsSequence, endsSequence, showTimestamp } = props

  const friendlyTimestamp = DateTime.fromJSDate(message.createdAt).toLocaleString()

  return (
    <Box>
      {showTimestamp && (
        <Box>
          <DateWithTime date={message.createdAt} />
        </Box>
      )}

      <Box>
        <Box title={friendlyTimestamp}>{nl2br(message.message, false)}</Box>
      </Box>
    </Box>
  )
}

export default Message
