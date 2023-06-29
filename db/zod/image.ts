import * as z from "zod"

export const ImageModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  title: z.string().nullish(),
  description: z.string().nullish(),
  url: z.string(),
})
