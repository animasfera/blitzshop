import * as z from "zod"
import {
  CompletePrice,
  RelatedPriceModel,
  CompleteItem,
  RelatedItemModel,
  CompleteUser,
  RelatedUserModel,
} from "./index"

export const CartModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  numItems: z.number().int(),
  sessionId: z.string().nullish(),
  priceId: z.number().int(),
  userId: z.number().int().nullish(),
  mergedCartId: z.number().int().nullish(),
})

export interface CompleteCart extends z.infer<typeof CartModel> {
  amount: CompletePrice
  items: CompleteItem[]
  user?: CompleteUser | null
}

/**
 * RelatedCartModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCartModel: z.ZodSchema<CompleteCart> = z.lazy(() =>
  CartModel.extend({
    amount: RelatedPriceModel,
    items: RelatedItemModel.array(),
    user: RelatedUserModel.nullish(),
  })
)
