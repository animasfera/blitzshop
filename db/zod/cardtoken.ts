import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const CardTokenModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  valid: z.boolean(),
  deleted: z.boolean(),
  invalidReason: z.string().nullish(),
  token: z.string(),
  cardLastFour: z.string(),
  cardType: z.string(),
  cardExpDate: z.string(),
  feeCardTransactionCoef: z.number(),
  cardCountryIsoCode: z.string(),
  ownerId: z.number().int(),
})

export interface CompleteCardToken extends z.infer<typeof CardTokenModel> {
  owner: CompleteUser
}

/**
 * RelatedCardTokenModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCardTokenModel: z.ZodSchema<CompleteCardToken> = z.lazy(() => CardTokenModel.extend({
  owner: RelatedUserModel,
}))
