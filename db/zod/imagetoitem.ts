import * as z from "zod"
import { CompleteImage, RelatedImageModel } from "./index"

export const ImageToItemModel = z.object({
  id: z.number().int(),
  imageId: z.number().int(),
})

export interface CompleteImageToItem extends z.infer<typeof ImageToItemModel> {
  image: CompleteImage
}

/**
 * RelatedImageToItemModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedImageToItemModel: z.ZodSchema<CompleteImageToItem> = z.lazy(() =>
  ImageToItemModel.extend({
    image: RelatedImageModel,
  })
)
