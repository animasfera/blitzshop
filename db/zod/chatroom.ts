import * as z from "zod"
import { ChatRoomTypeEnum, ChatRoomAccessEnum } from "@prisma/client"
import {
  CompleteRefund,
  RelatedRefundModel,
  CompleteItem,
  RelatedItemModel,
  CompleteMessage,
  RelatedMessageModel,
  CompleteUserToChatRoom,
  RelatedUserToChatRoomModel,
} from "./index"

export const ChatRoomModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  avatarUrl: z.string().nullish(),
  name: z.string().nullish(),
  type: z.nativeEnum(ChatRoomTypeEnum),
  access: z.nativeEnum(ChatRoomAccessEnum),
})

export interface CompleteChatRoom extends z.infer<typeof ChatRoomModel> {
  refund?: CompleteRefund | null
  item?: CompleteItem | null
  messages: CompleteMessage[]
  users: CompleteUserToChatRoom[]
}

/**
 * RelatedChatRoomModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedChatRoomModel: z.ZodSchema<CompleteChatRoom> = z.lazy(() =>
  ChatRoomModel.extend({
    refund: RelatedRefundModel.nullish(),
    item: RelatedItemModel.nullish(),
    messages: RelatedMessageModel.array(),
    users: RelatedUserToChatRoomModel.array(),
  })
)
