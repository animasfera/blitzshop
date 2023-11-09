import { z } from "zod"
import { ImageModel, ImageToItemModel } from "db/zod"

export const CreateImageSchema = ImageModel.pick({
  title: true,
  description: true,
  url: true,
}).partial({ title: true, description: true })

export const UpdateImageSchema = ImageModel.pick({
  id: true,
  title: true,
  description: true,
  url: true,
  uploaded: true,
}).partial({ title: true, description: true, url: true, uploaded: true })

export const DeleteImageSchema = z.object({
  id: z.number(),
})
