import * as z from "zod"
import { CurrencyEnum } from "@prisma/client"

export const PriceModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  amount: z.number().int(),
  currency: z.nativeEnum(CurrencyEnum),
})
