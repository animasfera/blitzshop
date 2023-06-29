import * as z from "zod"
import { TokenTypeEnum } from "@prisma/client"
import { CompleteUser, RelatedUserModel } from "./index"

export const TokenModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  hashedToken: z.string(),
  type: z.nativeEnum(TokenTypeEnum),
  expiresAt: z.date(),
  sentTo: z.string(),
  userId: z.number().int(),
})

export interface CompleteToken extends z.infer<typeof TokenModel> {
  user: CompleteUser
}

/**
 * RelatedTokenModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTokenModel: z.ZodSchema<CompleteToken> = z.lazy(() =>
  TokenModel.extend({
    user: RelatedUserModel,
  })
)
