import * as z from "zod"
import { CompleteDeliveryCountry, RelatedDeliveryCountryModel, CompleteDeliveryCity, RelatedDeliveryCityModel } from "./index"

export const DeliveryRegionModel = z.object({
  id: z.number().int(),
  code: z.number().int().nullish(),
  titleRu: z.string(),
  titleEn: z.string(),
  countryId: z.string(),
})

export interface CompleteDeliveryRegion extends z.infer<typeof DeliveryRegionModel> {
  country: CompleteDeliveryCountry
  cities: CompleteDeliveryCity[]
}

/**
 * RelatedDeliveryRegionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedDeliveryRegionModel: z.ZodSchema<CompleteDeliveryRegion> = z.lazy(() => DeliveryRegionModel.extend({
  country: RelatedDeliveryCountryModel,
  cities: RelatedDeliveryCityModel.array(),
}))
