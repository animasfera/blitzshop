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
} from "./index"

export const InvoiceModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  paidAt: z.date(),
  status: z.nativeEnum(InvoiceStatusEnum),
  error: z.string().nullish(),
  notes: z.string().nullish(),
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
  creditNotes: CompleteInvoice[]
  originalInvoice?: CompleteInvoice | null
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
    creditNotes: RelatedInvoiceModel.array(),
    originalInvoice: RelatedInvoiceModel.nullish(),
  })
)
