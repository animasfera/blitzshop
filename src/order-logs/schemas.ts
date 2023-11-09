import { z } from "zod"
import { OrderLogModel } from "db/zod"

export const CreateOrderLogSchema = OrderLogModel.pick({
  status: true,
  comment: true,
})

export const UpdateOrderLogSchema = OrderLogModel.pick({
  status: true,
  comment: true,
})
  .partial()
  .extend({
    id: z.number(),
  })


export const DeleteOrderLogSchema = z.object({
  id: z.number(),
})
