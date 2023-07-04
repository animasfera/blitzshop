import * as z from "zod"
import { CompleteShippingAddress, RelatedShippingAddressModel } from "./index"

export const CountryModel = z.object({
  id: z.string(),
  titleRu: z.string(),
  titleEn: z.string(),
})

export interface CompleteCountry extends z.infer<typeof CountryModel> {
  shippingAddresses: CompleteShippingAddress[]
}

/**
 * RelatedCountryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCountryModel: z.ZodSchema<CompleteCountry> = z.lazy(() => CountryModel.extend({
  shippingAddresses: RelatedShippingAddressModel.array(),
}))
