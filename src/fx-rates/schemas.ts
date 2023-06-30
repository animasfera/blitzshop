import { z } from "zod"
import { FxRateModel } from "db/zod"

export const CreateFxRateSchema = FxRateModel.pick({
  from: true,
  to: true,
  rate: true,
})

export const UpdateFxRateSchema = z.object({
  from: z.string(),
  to: z.string(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteFxRateSchema = z.object({
  from: z.string(),
})
