import { z } from "zod"
import { CurrencyEnum } from "db"
import { CartModel } from "db/zod"

export const CreateCartSchema = CartModel.pick({
  numItems: true,
  sessionId: true,
  amountId: true,
  userId: true,
  mergedCartId: true,
})

export const UpdateCartSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteCartSchema = z.object({
  id: z.number(),
})

export const AddProductToCartSchema = CartModel.pick({
  sessionId: true,
  userId: true,
}).extend({
  itemId: z.number(),
  price: z.object({
    amount: z.number().int(),
    currency: z.nativeEnum(CurrencyEnum),
  }),
  currency: z.nativeEnum(CurrencyEnum),
})
