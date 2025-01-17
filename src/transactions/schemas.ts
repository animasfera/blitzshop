import { z } from "zod"
import { TransactionModel } from "db/zod"
import { withIdOfSchema } from "db/zod/zodCore"

export const CreateTransactionSchema = TransactionModel.pick({
  remoteTransactionId: true,
  description: true,
  failureReason: true,
  failReasonCode: true,
  metadata: true,
  receiptUrl: true,
  status: true,
  type: true,
  amount: true,
  feeTotal: true,
  net: true,
  paymentMethodId: true,
  invoiceId: true,
}).partial({
  metadata: true,
  description: true,
  status: true,
  feeTotal: true,
  net: true,
  paymentMethodId: true,
  invoiceId: true,
})

export const UpdateTransactionSchema = z.object({
  id: z.number(),
  data: TransactionModel.partial().merge(withIdOfSchema(TransactionModel)),
})

export const DeleteTransactionSchema = z.object({
  id: z.number(),
})

export type CreateTransactionType = z.infer<typeof CreateTransactionSchema>
export type UpdateTransactionType = z.infer<typeof UpdateTransactionSchema>
