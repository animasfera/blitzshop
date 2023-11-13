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

export const GetShippingCost = z.object({
  deliveryMethod: z.number(),
  shippingAddress: z.object({
    country_code: z.string().optional(),
    city_code: z.number().or(z.string()).optional(),
    city: z.string().optional(),
    postal_code: z.string().optional(),
    address: z.string().optional(),
  }),
  packages: z.array(
    z.object({
      weight: z.number(),
      height: z.number().optional(),
      length: z.number().optional(),
      width: z.number().optional(),
    })
  ),
})

export type ShippingAddressPlainType = z.infer<typeof ShippingAddressPlain>
export type GetShippingCostType = z.infer<typeof GetShippingCost>
