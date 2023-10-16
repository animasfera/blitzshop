import * as z from "zod"
import { InvoiceStatusEnum, CurrencyEnum } from "@prisma/client"
import { CompletePaymentMethod, RelatedPaymentMethodModel, CompleteOrder, RelatedOrderModel, CompleteItem, RelatedItemModel, CompleteTransaction, RelatedTransactionModel } from "./index"

export const InvoiceModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  paidAt: z.date(),
  error: z.string().nullish(),
  notes: z.string().nullish(),
  status: z.nativeEnum(InvoiceStatusEnum),
  amount: z.number().int(),
  currency: z.nativeEnum(CurrencyEnum),
  paymentMethodId: z.number().int(),
  orderId: z.number().int(),
  parentItemId: z.number().int(),
  originalInvoiceId: z.number().int(),
})

export interface CompleteInvoice extends z.infer<typeof InvoiceModel> {
  paymentMethod: CompletePaymentMethod
  order: CompleteOrder
  parentItem: CompleteItem
  originalInvoice?: CompleteInvoice | null
  creditNotes: CompleteInvoice[]
  transactions: CompleteTransaction[]
}

/**
 * RelatedInvoiceModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedInvoiceModel: z.ZodSchema<CompleteInvoice> = z.lazy(() => InvoiceModel.extend({
  paymentMethod: RelatedPaymentMethodModel,
  order: RelatedOrderModel,
  parentItem: RelatedItemModel,
  originalInvoice: RelatedInvoiceModel.nullish(),
  creditNotes: RelatedInvoiceModel.array(),
  transactions: RelatedTransactionModel.array(),
}))
