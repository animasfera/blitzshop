import * as z from "zod"
import { MailStatusEnum } from "@prisma/client"
import { CompleteMailReceiver, RelatedMailReceiverModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const MailModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  subjectRu: z.string(),
  subjectEn: z.string(),
  bodyRu: jsonSchema,
  bodyEn: jsonSchema,
  status: z.nativeEnum(MailStatusEnum),
  errorMessage: z.string().nullish(),
  sendScheduledAt: z.date(),
  sentAt: z.date().nullish(),
  tags: jsonSchema,
  receiverTypeId: z.string().nullish(),
})

export interface CompleteMail extends z.infer<typeof MailModel> {
  receiverType?: CompleteMailReceiver | null
}

/**
 * RelatedMailModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMailModel: z.ZodSchema<CompleteMail> = z.lazy(() => MailModel.extend({
  receiverType: RelatedMailReceiverModel.nullish(),
}))
