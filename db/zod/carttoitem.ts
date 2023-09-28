import * as z from "zod"
import { CompleteItem, RelatedItemModel, CompleteCart, RelatedCartModel } from "./index"

export const CartToItemModel = z.object({
  id: z.number().int(),
  qty: z.number().int(),
  itemId: z.number().int(),
  cartId: z.number().int(),
})

export interface CompleteCartToItem extends z.infer<typeof CartToItemModel> {
  item: CompleteItem
  cart: CompleteCart
}

/**
 * RelatedCartToItemModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCartToItemModel: z.ZodSchema<CompleteCartToItem> = z.lazy(() => CartToItemModel.extend({
  item: RelatedItemModel,
  cart: RelatedCartModel,
}))
