import * as z from "zod"
import { CompleteDeliveryRegion, RelatedDeliveryRegionModel } from "./index"

export const DeliveryCountryModel = z.object({
  id: z.string(),
  code: z.string().nullish(),
  titleRu: z.string(),
  titleEn: z.string(),
  flag: z.string().nullish(),
})

export interface CompleteDeliveryCountry extends z.infer<typeof DeliveryCountryModel> {
  regions: CompleteDeliveryRegion[]
}

/**
 * RelatedDeliveryCountryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedDeliveryCountryModel: z.ZodSchema<CompleteDeliveryCountry> = z.lazy(() => DeliveryCountryModel.extend({
  regions: RelatedDeliveryRegionModel.array(),
}))
