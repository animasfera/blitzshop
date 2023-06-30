import { z } from "zod"
import { ShippingAddressModel } from "db/zod"

export const CreateShippingAddressSchema = ShippingAddressModel.pick({
  firstName: true,
  lastName: true,
  phone: true,
  instructions: true,
  address: true,
  city: true,
  postalCode: true,
  countryId: true,
  userId: true,
  orderId: true,
})

export const UpdateShippingAddressSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteShippingAddressSchema = z.object({
  id: z.number(),
})
