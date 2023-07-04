import * as z from "zod"
import { CompletePrice, RelatedPriceModel, CompleteItem, RelatedItemModel, CompleteCategory, RelatedCategoryModel, CompleteImage, RelatedImageModel, CompleteOrder, RelatedOrderModel, CompleteItemToRefund, RelatedItemToRefundModel } from "./index"

export const PurchasedItemModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  qty: z.number().int(),
  title: z.string(),
  description: z.string(),
  amountId: z.number().int(),
  itemId: z.number().int(),
  categoryId: z.number().int().nullish(),
  coverImageId: z.number().int(),
  orderId: z.number().int().nullish(),
})

export interface CompletePurchasedItem extends z.infer<typeof PurchasedItemModel> {
  amount: CompletePrice
  item: CompleteItem
  category?: CompleteCategory | null
  coverImage: CompleteImage
  Order?: CompleteOrder | null
  itemToRefunds: CompleteItemToRefund[]
}

/**
 * RelatedPurchasedItemModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPurchasedItemModel: z.ZodSchema<CompletePurchasedItem> = z.lazy(() => PurchasedItemModel.extend({
  amount: RelatedPriceModel,
  item: RelatedItemModel,
  category: RelatedCategoryModel.nullish(),
  coverImage: RelatedImageModel,
  Order: RelatedOrderModel.nullish(),
  itemToRefunds: RelatedItemToRefundModel.array(),
}))
