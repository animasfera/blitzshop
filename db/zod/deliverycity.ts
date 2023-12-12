import * as z from "zod"
import { CompleteDeliveryRegion, RelatedDeliveryRegionModel } from "./index"

export const DeliveryCityModel = z.object({
  id: z.number().int(),
  code: z.number().int().nullish(),
  titleRu: z.string(),
  titleEn: z.string(),
  lat: z.number().nullish(),
  lng: z.number().nullish(),
  regionId: z.number().int(),
})

export interface CompleteDeliveryCity extends z.infer<typeof DeliveryCityModel> {
  region: CompleteDeliveryRegion
}

/**
 * RelatedDeliveryCityModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedDeliveryCityModel: z.ZodSchema<CompleteDeliveryCity> = z.lazy(() => DeliveryCityModel.extend({
  region: RelatedDeliveryRegionModel,
}))
