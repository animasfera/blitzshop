import { z } from "zod"
import { MailReceiverModel } from "db/zod"

export const CreateMailReceiverSchema = MailReceiverModel.pick({
  id: true,
  title: true,
  query: true,
})

export const UpdateMailReceiverSchema = z.object({
  id: z.string(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteMailReceiverSchema = z.object({
  id: z.string(),
})
