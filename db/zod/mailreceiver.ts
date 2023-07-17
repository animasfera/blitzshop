import * as z from "zod"
import { CompleteMail, RelatedMailModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
)

export const MailReceiverModel = z.object({
  id: z.string(),
  title: z.string(),
  query: jsonSchema,
})

export interface CompleteMailReceiver extends z.infer<typeof MailReceiverModel> {
  Mail: CompleteMail[]
}

/**
 * RelatedMailReceiverModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMailReceiverModel: z.ZodSchema<CompleteMailReceiver> = z.lazy(() =>
  MailReceiverModel.extend({
    Mail: RelatedMailModel.array(),
  })
)
