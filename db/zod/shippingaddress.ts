import * as z from "zod"
import { CompleteCountry, RelatedCountryModel, CompleteUser, RelatedUserModel, CompleteOrder, RelatedOrderModel } from "./index"

export const ShippingAddressModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  instructions: z.string().nullish(),
  address: z.string(),
  city: z.string(),
  province: z.string(),
  postalCode: z.string(),
  countryId: z.string(),
  userId: z.number().int(),
})

export interface CompleteShippingAddress extends z.infer<typeof ShippingAddressModel> {
  country: CompleteCountry
  user: CompleteUser
  orders: CompleteOrder[]
}

/**
 * RelatedShippingAddressModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedShippingAddressModel: z.ZodSchema<CompleteShippingAddress> = z.lazy(() => ShippingAddressModel.extend({
  country: RelatedCountryModel,
  user: RelatedUserModel,
  orders: RelatedOrderModel.array(),
}))
