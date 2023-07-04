import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const SessionModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  expiresAt: z.date().nullish(),
  handle: z.string(),
  hashedSessionToken: z.string().nullish(),
  antiCSRFToken: z.string().nullish(),
  publicData: z.string().nullish(),
  privateData: z.string().nullish(),
  userId: z.number().int().nullish(),
})

export interface CompleteSession extends z.infer<typeof SessionModel> {
  user?: CompleteUser | null
}

/**
 * RelatedSessionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSessionModel: z.ZodSchema<CompleteSession> = z.lazy(() => SessionModel.extend({
  user: RelatedUserModel.nullish(),
}))
