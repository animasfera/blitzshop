import { z } from "zod"
import { MailModel } from "db/zod"

export const CreateMailSchema = MailModel.pick({
  subjectRu: true,
  subjectEn: true,
  bodyRu: true,
  bodyEn: true,
  tags: true,
  status: true,
  errorMessage: true,
  sentAt: true,
  sendScheduledAt: true,
  receiverTypeId: true,
})

export const UpdateMailSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteMailSchema = z.object({
  id: z.number(),
})
