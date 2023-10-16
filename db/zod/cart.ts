import * as z from "zod"
import { CurrencyEnum } from "@prisma/client"
import { CompleteUser, RelatedUserModel, CompleteCartToItem, RelatedCartToItemModel } from "./index"

export const CartModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  numItems: z.number().int(),
  sessionId: z.string().nullish(),
  mergedCartId: z.number().int().nullish(),
  amount: z.number().int(),
  currency: z.nativeEnum(CurrencyEnum),
  userId: z.number().int().nullish(),
})

export interface CompleteCart extends z.infer<typeof CartModel> {
  user?: CompleteUser | null
  cartToItems: CompleteCartToItem[]
}

/**
 * RelatedCartModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCartModel: z.ZodSchema<CompleteCart> = z.lazy(() => CartModel.extend({
  user: RelatedUserModel.nullish(),
  cartToItems: RelatedCartToItemModel.array(),
}))
