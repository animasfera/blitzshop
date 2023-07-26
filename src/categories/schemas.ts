import { z } from "zod"
import { CategoryModel } from "db/zod"

export const CreateCategorySchema = CategoryModel.pick({
  title: true,
  description: true,
  numItems: true,
})

export const UpdateCategorySchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteCategorySchema = z.object({
  id: z.number(),
})
