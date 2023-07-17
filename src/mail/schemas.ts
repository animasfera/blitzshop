import { z } from "zod"

export const CreateMailSchema = z.object({
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateMailSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteMailSchema = z.object({
  id: z.number(),
})
