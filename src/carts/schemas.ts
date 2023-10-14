import { z } from "zod"
import { CurrencyEnum } from "db"
import { CartModel, CartToItemModel } from "db/zod"

export const CreateCartSchema = CartModel.pick({
  userId: true,
})

export const UpdateCartSchema = z.object({
  id: z.number(),
})

export const DeleteCartSchema = z.object({
  id: z.number(),
})

export const MergedCart = CartModel.pick({
  sessionId: true,
  userId: true,
}).extend({
  currency: z.nativeEnum(CurrencyEnum),
})

export const AddProductToCartSchema = CartToItemModel.pick({
  itemId: true,
})
