import * as z from "zod"
import { CompleteTransaction, RelatedTransactionModel } from "./index"

export const PaymentMethodModel = z.object({
  id: z.number().int(),
  name: z.string(),
  title: z.string(),
  description: z.string().nullish(),
})

export interface CompletePaymentMethod extends z.infer<typeof PaymentMethodModel> {
  transactions: CompleteTransaction[]
}

/**
 * RelatedPaymentMethodModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPaymentMethodModel: z.ZodSchema<CompletePaymentMethod> = z.lazy(() => PaymentMethodModel.extend({
  transactions: RelatedTransactionModel.array(),
}))
