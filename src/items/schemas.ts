import { z } from "zod"
import { ItemModel } from "db/zod"

export const CreateItemSchema = ItemModel.pick({
  title: true,
  description: true,
  qty: true,
  weight: true,
  rating: true,
  isFeatured: true,
  status: true,
  access: true,
  categoryId: true,
  amountId: true,
  coverImageId: true,
  userId: true,
  cartId: true,
})

export const UpdateItemSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteItemSchema = z.object({
  id: z.number(),
})
