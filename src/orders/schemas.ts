import { z } from "zod"
import { OrderModel } from "db/zod"

export const CreateOrderSchema = OrderModel.pick({
  status: true,
  couponCode: true,
  notes: true,
  priceId: true,
  orderLogId: true,
  shippingMethodId: true,
  userId: true,
})

export const UpdateOrderSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteOrderSchema = z.object({
  id: z.number(),
})
