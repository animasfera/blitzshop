import { z } from "zod"
import { InvoiceModel } from "db/zod"

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
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteInvoiceSchema = z.object({
  id: z.number(),
})
