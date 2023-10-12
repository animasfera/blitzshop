import { z } from "zod"
import { CartToItemModel } from "db/zod"

export const CreateCartToItemSchema = CartToItemModel.pick({
  cartId: true,
  itemId: true,
  qty: true,
})

export const UpdateCartToItemSchema = z.object({
  id: z.number(),
  qty: z.number().int().optional(),
})

export const DeleteCartToItemSchema = z.object({
  id: z.number(),
})

export const AddProductToCartSchema = CartToItemModel.pick({
  itemId: true,
})
