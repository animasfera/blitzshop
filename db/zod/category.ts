import * as z from "zod"

export const CategoryModel = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string(),
  numItems: z.number().int(),
})
