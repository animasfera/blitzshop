import { z } from "zod"
import { ImageModel, ItemModel } from "db/zod"
import { images } from "next.config"

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

export const UpdateItemSchema = ItemModel.pick({
  id: true,
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
  width: true,
  height: true,
  length: true,
})
  .partial({
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
    width: true,
    height: true,
    length: true,
  })
  .extend({
    images: z.any().optional(),
  })

export const DeleteItemSchema = z.object({
  id: z.number(),
})
