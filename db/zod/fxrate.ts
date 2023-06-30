import * as z from "zod"

export const FxRateModel = z.object({
  updatedAt: z.date(),
  from: z.string(),
  to: z.string(),
  rate: z.number(),
})
