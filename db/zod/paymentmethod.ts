import * as z from "zod"
import { CompleteRefund, RelatedRefundModel, CompleteInvoice, RelatedInvoiceModel } from "./index"

export const PaymentMethodModel = z.object({
  id: z.number().int(),
  name: z.string(),
  title: z.string(),
  description: z.string().nullish(),
})

export interface CompletePaymentMethod extends z.infer<typeof PaymentMethodModel> {
  refunds: CompleteRefund[]
  invoices: CompleteInvoice[]
}

/**
 * RelatedPaymentMethodModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPaymentMethodModel: z.ZodSchema<CompletePaymentMethod> = z.lazy(() =>
  PaymentMethodModel.extend({
    refunds: RelatedRefundModel.array(),
    invoices: RelatedInvoiceModel.array(),
  })
)
