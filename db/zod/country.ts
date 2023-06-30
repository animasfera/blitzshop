import * as z from "zod"

export const CountryModel = z.object({
  id: z.string(),
  titleRu: z.string(),
  titleEn: z.string(),
})
