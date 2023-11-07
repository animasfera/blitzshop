import { z } from "zod"
import { ImageModel, ImageToItemModel } from "db/zod"

export const CreateImageSchema = ImageModel.pick({
  title: true,
  description: true,
  url: true,
}).partial({ title: true, description: true })

export const UpdateImageSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteImageSchema = z.object({
  id: z.number(),
})
