import * as z from "zod"
import { CompleteOrder, RelatedOrderModel } from "./index"

export const ShippingMethodModel = z.object({
  id: z.number().int(),
  titleRu: z.string(),
  titleEn: z.string(),
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
