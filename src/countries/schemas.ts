import { z } from "zod"
import { CountryModel } from "db/zod"

export const CreateCountrySchema = CountryModel.pick({
  id: true,
  titleRu: true,
  titleEn: true,
})

export const UpdateCountrySchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteCountrySchema = z.object({
  id: z.number(),
})
