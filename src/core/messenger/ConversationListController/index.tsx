import { useQuery } from "@blitzjs/rpc"
import { ChatRoomTypeEnum } from "@prisma/client"
import { useTranslation } from "react-i18next"
import { Box } from "@chakra-ui/react"

import getChatRooms from "src/chat-rooms/queries/getChatRooms"
import { ConversationList } from "../ConversationList"
import { ChatRoomWithFirstMessage } from "types"

type ConversationListControllerProps = {
  userId: number
  type?: ChatRoomTypeEnum
  onClick?: (chatRoom: ChatRoomWithFirstMessage) => void
}
export const ConversationListController = (props: ConversationListControllerProps) => {
  const { userId, type = ChatRoomTypeEnum.PAIR, onClick } = props
  const [{ chatRooms }] = useQuery(getChatRooms, {
    where: { users: { some: { userId } }, type },
  })
  const { t } = useTranslation(["message"])
  return (
    <>
      {chatRooms.length === 0 ? (
        <>
          <Box color={"gray"} p={10}>
            {t("noChats")}
          </Box>
        </>
      ) : (
        <ConversationList
          senderId={userId}
          // TODO поправить когда будет внедряться
          // @ts-ignore
          chatRooms={chatRooms}
          onClick={(chatRoom) => {
            onClick && onClick(chatRoom)
          }}
        />
      )}
    </>
  )
}

export default ConversationListController
