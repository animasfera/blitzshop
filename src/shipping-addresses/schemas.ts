import { z } from "zod"
import { ShippingAddressModel } from "db/zod"

export const CreateShippingAddressSchema = ShippingAddressModel.pick({
  /*
  firstName: true,
  lastName: true,
  phone: true,
  address: true,
  city: true,
  postalCode: true,
  */
  countryId: true,
  deliveryMethod: true,
  // province: true,
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
