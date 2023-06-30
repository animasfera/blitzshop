import { z } from "zod"
import { PaymentMethodModel } from "db/zod"

export const CreatePaymentMethodSchema = PaymentMethodModel.pick({
  name: true,
  title: true,
  description: true,
})

export const UpdatePaymentMethodSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeletePaymentMethodSchema = z.object({
  id: z.number(),
})
