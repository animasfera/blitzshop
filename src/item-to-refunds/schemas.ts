import { z } from "zod"
import { ItemToRefundModel } from "db/zod"

export const CreateItemToRefundSchema = ItemToRefundModel.pick({
  itemId: true,
  refundId: true,
})

export const UpdateItemToRefundSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteItemToRefundSchema = z.object({
  id: z.number(),
})
