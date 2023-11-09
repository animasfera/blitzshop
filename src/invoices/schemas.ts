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

export const UpdateInvoiceSchema = InvoiceModel.pick({
  status: true,
  notes: true,
})
  .partial({
    status: true,
    notes: true,
  })
  .merge(withIdOfSchema(InvoiceModel))

export const DeleteInvoiceSchema = z.object({
  id: z.number(),
})

export type UpdateInvoiceType = z.infer<typeof UpdateInvoiceSchema>
