import * as z from "zod"
import { CompletePrice, RelatedPriceModel, CompleteUser, RelatedUserModel, CompleteItem, RelatedItemModel } from "./index"

export const CartModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  numItems: z.number().int(),
  sessionId: z.string().nullish(),
  mergedCartId: z.number().int().nullish(),
  amountId: z.number().int(),
  userId: z.number().int().nullish(),
})

export interface CompleteCart extends z.infer<typeof CartModel> {
  amount: CompletePrice
  user?: CompleteUser | null
  items: CompleteItem[]
}

/**
 * RelatedCartModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCartModel: z.ZodSchema<CompleteCart> = z.lazy(() => CartModel.extend({
  amount: RelatedPriceModel,
  user: RelatedUserModel.nullish(),
  items: RelatedItemModel.array(),
}))
