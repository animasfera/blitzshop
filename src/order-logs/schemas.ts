import { z } from "zod"
import { OrderLogModel } from "db/zod"

export const CreateOrderLogSchema = OrderLogModel.pick({
  status: true,
  comment: true,
})

export const UpdateOrderLogSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteOrderLogSchema = z.object({
  id: z.number(),
})
