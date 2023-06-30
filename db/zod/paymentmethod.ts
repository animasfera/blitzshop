import * as z from "zod"

export const PaymentMethodModel = z.object({
  id: z.number().int(),
  name: z.string(),
  title: z.string(),
  description: z.string().nullish(),
})
