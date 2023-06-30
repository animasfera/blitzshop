import { z } from "zod"
import { TransactionModel } from "db/zod"

export const CreateTransactionSchema = TransactionModel.pick({
  remoteTransactionId: true,
  description: true,
  failureReason: true,
  failReasonCode: true,
  metadata: true,
  receiptUrl: true,
  status: true,
  type: true,
  amountId: true,
  feeTotalId: true,
  netId: true,
  paymentMethodId: true,
  invoiceId: true,
  userId: true,
})

export const UpdateTransactionSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteTransactionSchema = z.object({
  id: z.number(),
})
