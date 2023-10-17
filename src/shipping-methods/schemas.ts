import { z } from "zod"
import { ShippingMethodModel } from "db/zod"
import { CurrencyEnum } from "@prisma/client"

export const CreateShippingMethodSchema = ShippingMethodModel.pick({
  titleRu: true,
  titleEn: true,
  description: true,
})

export const UpdateShippingMethodSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteShippingMethodSchema = z.object({
  id: z.number(),
})

export type ShippingMethodWithPrice = {
  id: number
  titleRu: string
  titleEn: string
  price: number
  currency: CurrencyEnum
}
