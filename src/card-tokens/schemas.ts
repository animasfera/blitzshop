import { z } from "zod"
import { CardTokenModel } from "db/zod"

export const CreateCardTokenSchema = CardTokenModel.pick({
  valid: true,
  deleted: true,
  invalidReason: true,
  token: true,
  cardLastFour: true,
  cardType: true,
  cardExpDate: true,
  feeCardTransactionCoef: true,
  cardCountryIsoCode: true,
  ownerId: true,
})

export const UpdateCardTokenSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteCardTokenSchema = z.object({
  id: z.number(),
})
