import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteChatRoom, RelatedChatRoomModel, CompleteUserToChatRoom, RelatedUserToChatRoomModel } from "./index"

export const MessageModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  message: z.string(),
  senderId: z.number().int(),
  roomId: z.number().int(),
})

export interface CompleteMessage extends z.infer<typeof MessageModel> {
  sender: CompleteUser
  room: CompleteChatRoom
  lastInChatRoomToUser?: CompleteUserToChatRoom | null
}

/**
 * RelatedMessageModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMessageModel: z.ZodSchema<CompleteMessage> = z.lazy(() => MessageModel.extend({
  sender: RelatedUserModel,
  room: RelatedChatRoomModel,
  lastInChatRoomToUser: RelatedUserToChatRoomModel.nullish(),
}))
