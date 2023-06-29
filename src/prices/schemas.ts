import { z } from "zod"
import { PriceModel } from "db/zod"

export const CreatePriceSchema = PriceModel.pick({
  amount: true,
  currency: true,
})

export const UpdatePriceSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeletePriceSchema = z.object({
  id: z.number(),
})
