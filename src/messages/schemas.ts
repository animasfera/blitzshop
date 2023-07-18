import { MessageModel } from "db/zod"
import { z } from "zod"

export const CreateMessageSchema = MessageModel.pick({
  message: true,
  senderId: true,
  roomId: true,
})

export const UpdateMessageSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteMessageSchema = z.object({
  id: z.number(),
})
