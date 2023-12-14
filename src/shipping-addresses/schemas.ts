import { z } from "zod"
import { ShippingAddressModel } from "db/zod"

export const CreateShippingAddressSchema = ShippingAddressModel.pick({
  firstName: true,
  lastName: true,

  countryId: true,
  deliveryMethod: true,
  provinceId: true,
  province: true,
  cityId: true,
  city: true,
  postalCode: true,
  address: true,

  phone: true,
}).extend({
  countryId: z.string().or(z.number()),
  province: z.string().nullish(),
  provinceId: z.number().int().nullish(),
  city: z.string().nullish(),
  cityId: z.number().int().nullish(),
  postalCode: z.string().nullish(),
})

export const UpdateShippingAddressSchema = ShippingAddressModel.pick({
  firstName: true,
  lastName: true,
  phone: true,
  postalCode: true,
  city: true,
  address: true,
  instructions: true,
})
  .partial()
  .extend({
    id: z.number(),
  })

export const DeleteShippingAddressSchema = z.object({
  id: z.number(),
})

export const ShippingAddressPlain = ShippingAddressModel.pick({
  firstName: true,
  lastName: true,
  phone: true,
  address: true,
  city: true,
  postalCode: true,
  countryId: true,
})

export type ShippingAddressPlainType = z.infer<typeof ShippingAddressPlain>
