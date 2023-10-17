import { z } from "zod"
import { ShippingAddressModel } from "db/zod"

export const CreateShippingAddressSchema = ShippingAddressModel.pick({
  firstName: true,
  lastName: true,
  phone: true,
  address: true,
  city: true,
  postalCode: true,
  countryId: true,
  province: true,
})

export const UpdateShippingAddressSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
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
