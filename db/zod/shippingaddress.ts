import * as z from "zod"
import { DeliveryMethodEnum, ShippingCompanyEnum } from "@prisma/client"
import { CompleteCountry, RelatedCountryModel, CompleteUser, RelatedUserModel, CompleteOrder, RelatedOrderModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const ShippingAddressModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deliveryMethod: z.nativeEnum(DeliveryMethodEnum).nullish(),
  company: z.nativeEnum(ShippingCompanyEnum).nullish(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  instructions: z.string().nullish(),
  address: z.string(),
  city: z.string(),
  cityId: z.number().int().nullish(),
  province: z.string(),
  provinceId: z.number().int().nullish(),
  postalCode: z.string(),
  countryId: z.string(),
  userId: z.number().int(),
  metadata: jsonSchema,
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
