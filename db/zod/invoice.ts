import * as z from "zod"
import { InvoiceStatusEnum, CurrencyEnum } from "@prisma/client"
import { CompleteRefund, RelatedRefundModel, CompleteOrder, RelatedOrderModel, CompleteTransaction, RelatedTransactionModel } from "./index"

export const InvoiceModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  paidAt: z.date().nullish(),
  error: z.string().nullish(),
  notes: z.string().nullish(),
  status: z.nativeEnum(InvoiceStatusEnum),
  amount: z.number().int(),
  currency: z.nativeEnum(CurrencyEnum),
  originalInvoiceId: z.number().int().nullish(),
})

export interface CompleteInvoice extends z.infer<typeof InvoiceModel> {
  originalInvoice?: CompleteInvoice | null
  refund?: CompleteRefund | null
  order?: CompleteOrder | null
  creditNotes: CompleteInvoice[]
  transactions: CompleteTransaction[]
}

/**
 * RelatedInvoiceModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedInvoiceModel: z.ZodSchema<CompleteInvoice> = z.lazy(() => InvoiceModel.extend({
  originalInvoice: RelatedInvoiceModel.nullish(),
  refund: RelatedRefundModel.nullish(),
  order: RelatedOrderModel.nullish(),
  creditNotes: RelatedInvoiceModel.array(),
  transactions: RelatedTransactionModel.array(),
}))
