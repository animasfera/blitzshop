import { z } from "zod"
import { RefundModel } from "db/zod"

export const CreateRefundSchema = RefundModel.pick({
  status: true,
  notes: true,
  refundedAt: true,
  amountId: true,
  refundMethodId: true,
  processedById: true,
  orderId: true,
  userId: true,
})

export const UpdateRefundSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteRefundSchema = z.object({
  id: z.number(),
})
