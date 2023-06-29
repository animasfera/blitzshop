import * as z from "zod"
import { CompleteImage, RelatedImageModel, CompleteItem, RelatedItemModel } from "./index"

export const ImageToItemModel = z.object({
  id: z.number().int(),
  imageId: z.number().int(),
  itemId: z.number().int().nullish(),
})

export interface CompleteImageToItem extends z.infer<typeof ImageToItemModel> {
  image: CompleteImage
  itemCovers: CompleteItem[]
  item?: CompleteItem | null
}

/**
 * RelatedImageToItemModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedImageToItemModel: z.ZodSchema<CompleteImageToItem> = z.lazy(() =>
  ImageToItemModel.extend({
    image: RelatedImageModel,
    itemCovers: RelatedItemModel.array(),
    item: RelatedItemModel.nullish(),
  })
)
