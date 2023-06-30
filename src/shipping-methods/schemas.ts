import { z } from "zod"
import { ShippingMethodModel } from "db/zod"

export const CreateShippingMethodSchema = ShippingMethodModel.pick({
  title: true,
  description: true,
  fee: true,
  feeType: true,
})

export const UpdateShippingMethodSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteShippingMethodSchema = z.object({
  id: z.number(),
})
