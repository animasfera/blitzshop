import { z } from "zod"
import { ImageToItemModel } from "db/zod"

export const CreateImageToItemSchema = ImageToItemModel.pick({
  imageId: true,
  itemId: true,
  order: true,
}).partial({ order: true })

export const UpdateImageToItemSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteImageToItemSchema = z.object({
  id: z.number(),
})
