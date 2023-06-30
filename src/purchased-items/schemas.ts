import { z } from "zod"
import { PurchasedItemModel } from "db/zod"

export const CreatePurchasedItemSchema = PurchasedItemModel.pick({
  qty: true,
  title: true,
  description: true,
  amountId: true,
  itemId: true,
  categoryId: true,
  coverImageId: true,
  orderId: true,
})

export const UpdatePurchasedItemSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeletePurchasedItemSchema = z.object({
  id: z.number(),
})
