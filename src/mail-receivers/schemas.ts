import { z } from "zod"

export const CreateMailReceiverSchema = z.object({
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateMailReceiverSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteMailReceiverSchema = z.object({
  id: z.number(),
})
