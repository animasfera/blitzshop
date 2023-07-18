import * as z from "zod"
import { UserRoleEnum } from "@prisma/client"
import {
  CompleteUser,
  RelatedUserModel,
  CompleteChatRoom,
  RelatedChatRoomModel,
  CompleteMessage,
  RelatedMessageModel,
} from "./index"

export const UserToChatRoomModel = z.object({
  numUnread: z.number().int(),
  role: z.nativeEnum(UserRoleEnum).nullish(),
  userId: z.number().int(),
  roomId: z.number().int(),
  lastReadMessageId: z.number().int().nullish(),
})

export interface CompleteUserToChatRoom extends z.infer<typeof UserToChatRoomModel> {
  user: CompleteUser
  room: CompleteChatRoom
  lastReadMessage?: CompleteMessage | null
}

/**
 * RelatedUserToChatRoomModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserToChatRoomModel: z.ZodSchema<CompleteUserToChatRoom> = z.lazy(() =>
  UserToChatRoomModel.extend({
    user: RelatedUserModel,
    room: RelatedChatRoomModel,
    lastReadMessage: RelatedMessageModel.nullish(),
  })
)
