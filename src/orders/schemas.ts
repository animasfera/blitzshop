import { z } from "zod"
import { OrderModel } from "db/zod"

export const CreateOrderSchema = OrderModel.pick({
  status: true,
  couponCode: true,
  notes: true,
  amountId: true,
  orderLogId: true,
  shippingMethodId: true,
  userId: true,
})

export const UpdateOrderSchema = OrderModel.pick({
  couponCode: true,
  notes: true,
  status: true,
})
  .partial()
  .extend({
    id: z.number(),
  })

export const DeleteOrderSchema = z.object({
  id: z.number(),
})
