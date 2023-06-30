import * as z from "zod"
import { ShippingFeeTypeEnum } from "@prisma/client"

export const ShippingMethodModel = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string().nullish(),
  fee: z.number().int(),
  feeType: z.nativeEnum(ShippingFeeTypeEnum),
})
