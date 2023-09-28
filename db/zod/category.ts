import * as z from "zod"
import { CompleteItem, RelatedItemModel, CompletePurchasedItem, RelatedPurchasedItemModel } from "./index"

export const CategoryModel = z.object({
  id: z.number().int(),
  titleRu: z.string(),
  titleEn: z.string(),
  descriptionRu: z.string(),
  descriptionEn: z.string(),
  numItems: z.number().int(),
})

export interface CompleteCategory extends z.infer<typeof CategoryModel> {
  items: CompleteItem[]
  purchasedItems: CompletePurchasedItem[]
}

/**
 * RelatedCategoryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCategoryModel: z.ZodSchema<CompleteCategory> = z.lazy(() => CategoryModel.extend({
  items: RelatedItemModel.array(),
  purchasedItems: RelatedPurchasedItemModel.array(),
}))
