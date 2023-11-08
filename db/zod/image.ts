import * as z from "zod"
import { CompleteImageToItem, RelatedImageToItemModel, CompletePurchasedItem, RelatedPurchasedItemModel } from "./index"

export const ImageModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  title: z.string().nullish(),
  description: z.string().nullish(),
  url: z.string(),
  uploaded: z.boolean(),
})

export interface CompleteImage extends z.infer<typeof ImageModel> {
  imageToItems: CompleteImageToItem[]
  purchasedItems: CompletePurchasedItem[]
}

/**
 * RelatedImageModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedImageModel: z.ZodSchema<CompleteImage> = z.lazy(() => ImageModel.extend({
  imageToItems: RelatedImageToItemModel.array(),
  purchasedItems: RelatedPurchasedItemModel.array(),
}))
