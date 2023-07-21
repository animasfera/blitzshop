import { z } from "zod"
import { InvoiceModel, TransactionModel } from "db/zod"
import { withIdOfSchema } from "db/zod/zodCore"

export const CreateInvoiceSchema = InvoiceModel.pick({
  paidAt: true,
  status: true,
  error: true,
  notes: true,
  amountId: true,
  paymentMethodId: true,
  orderId: true,
  parentItemId: true,
  originalInvoiceId: true,
})

export const UpdateInvoiceSchema = z.object({
  id: z.number(),
  data: InvoiceModel.pick({
    status: true,
    amount: true,
  })
    .partial()
    .merge(withIdOfSchema(InvoiceModel)),
})

export const DeleteInvoiceSchema = z.object({
  id: z.number(),
})

export const StartRefundSchema = z.object({
  invoice: InvoiceModel.pick({ id: true }),
  transaction: TransactionModel.pick({
    amount: true,
    amountId: true,
    feeTotal: true,
  }).optional(),
})

export type StartRefundType = z.infer<typeof StartRefundSchema>
export type UpdateInvoiceType = z.infer<typeof UpdateInvoiceSchema>
