import * as z from "zod"
import { ShippingFeeTypeEnum } from "@prisma/client"
import { CompleteOrder, RelatedOrderModel } from "./index"

export const ShippingMethodModel = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string().nullish(),
  fee: z.number().int(),
  feeType: z.nativeEnum(ShippingFeeTypeEnum),
})

export interface CompleteShippingMethod extends z.infer<typeof ShippingMethodModel> {
  orders: CompleteOrder[]
}

/**
 * RelatedShippingMethodModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedShippingMethodModel: z.ZodSchema<CompleteShippingMethod> = z.lazy(() => ShippingMethodModel.extend({
  orders: RelatedOrderModel.array(),
}))
