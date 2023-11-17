import * as z from "zod"
import { OrderStatusEnum } from "@prisma/client"
import { CompleteOrder, RelatedOrderModel, CompleteUser, RelatedUserModel } from "./index"

export const OrderLogModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  status: z.nativeEnum(OrderStatusEnum).nullish(),
  comment: z.string().nullish(),
  orderId: z.number().int(),
  userId: z.number().int().nullish(),
})

export interface CompleteOrderLog extends z.infer<typeof OrderLogModel> {
  orders: CompleteOrder
  user?: CompleteUser | null
}

/**
 * RelatedOrderLogModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrderLogModel: z.ZodSchema<CompleteOrderLog> = z.lazy(() => OrderLogModel.extend({
  orders: RelatedOrderModel,
  user: RelatedUserModel.nullish(),
}))
