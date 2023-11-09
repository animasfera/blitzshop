import * as z from "zod"
import { CompleteCountry, RelatedCountryModel, CompleteUser, RelatedUserModel, CompleteItem, RelatedItemModel } from "./index"

export const LocationModel = z.object({
  id: z.number().int(),
  lat: z.number(),
  lng: z.number(),
  addressRu: z.string(),
  addressEn: z.string(),
  cityRu: z.string(),
  cityEn: z.string(),
  countryId: z.string(),
})

export interface CompleteLocation extends z.infer<typeof LocationModel> {
  country: CompleteCountry
  users: CompleteUser[]
  items: CompleteItem[]
}

/**
 * RelatedLocationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedLocationModel: z.ZodSchema<CompleteLocation> = z.lazy(() => LocationModel.extend({
  country: RelatedCountryModel,
  users: RelatedUserModel.array(),
  items: RelatedItemModel.array(),
}))
