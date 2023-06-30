import * as z from "zod"
import { InvoiceStatusEnum } from "@prisma/client"
import {
  CompletePrice,
  RelatedPriceModel,
  CompletePaymentMethod,
  RelatedPaymentMethodModel,
  CompleteOrder,
  RelatedOrderModel,
  CompleteItem,
  RelatedItemModel,
  CompleteTransaction,
  RelatedTransactionModel,
} from "./index"

export const InvoiceModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  paidAt: z.date(),
  error: z.string().nullish(),
  notes: z.string().nullish(),
  status: z.nativeEnum(InvoiceStatusEnum),
  amountId: z.number().int(),
  paymentMethodId: z.number().int(),
  orderId: z.number().int(),
  parentItemId: z.number().int(),
  originalInvoiceId: z.number().int(),
})

export interface CompleteInvoice extends z.infer<typeof InvoiceModel> {
  amount: CompletePrice
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
export const RelatedInvoiceModel: z.ZodSchema<CompleteInvoice> = z.lazy(() =>
  InvoiceModel.extend({
    amount: RelatedPriceModel,
    paymentMethod: RelatedPaymentMethodModel,
    order: RelatedOrderModel,
    parentItem: RelatedItemModel,
    originalInvoice: RelatedInvoiceModel.nullish(),
    creditNotes: RelatedInvoiceModel.array(),
    transactions: RelatedTransactionModel.array(),
  })
)
