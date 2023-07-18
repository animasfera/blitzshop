import { z } from "zod"

export const CreateChatRoomSchema = z.object({
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateChatRoomSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteChatRoomSchema = z.object({
  id: z.number(),
})
