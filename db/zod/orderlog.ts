import * as z from "zod"
import { OrderStatusEnum } from "@prisma/client"
import { CompleteOrder, RelatedOrderModel } from "./index"

export const OrderLogModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  status: z.nativeEnum(OrderStatusEnum),
  comment: z.string().nullish(),
})

export interface CompleteOrderLog extends z.infer<typeof OrderLogModel> {
  orders: CompleteOrder[]
}

/**
 * RelatedOrderLogModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrderLogModel: z.ZodSchema<CompleteOrderLog> = z.lazy(() =>
  OrderLogModel.extend({
    orders: RelatedOrderModel.array(),
  })
)
