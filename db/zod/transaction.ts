import * as z from "zod"
import { TransactionStatusEnum, TransactionTypeEnum, CurrencyEnum } from "@prisma/client"
import { CompletePaymentMethod, RelatedPaymentMethodModel, CompleteInvoice, RelatedInvoiceModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const TransactionModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  remoteTransactionId: z.string().nullish(),
  description: z.string().nullish(),
  failureReason: z.string().nullish(),
  failReasonCode: z.number().int().nullish(),
  metadata: jsonSchema,
  receiptUrl: z.string().nullish(),
  status: z.nativeEnum(TransactionStatusEnum),
  type: z.nativeEnum(TransactionTypeEnum),
  amount: z.number().int(),
  net: z.number().int(),
  feeTotal: z.number().int(),
  currency: z.nativeEnum(CurrencyEnum),
  paymentMethodId: z.number().int().nullish(),
  invoiceId: z.number().int().nullish(),
})

export interface CompleteTransaction extends z.infer<typeof TransactionModel> {
  paymentMethod?: CompletePaymentMethod | null
  invoice?: CompleteInvoice | null
}

/**
 * RelatedTransactionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTransactionModel: z.ZodSchema<CompleteTransaction> = z.lazy(() => TransactionModel.extend({
  paymentMethod: RelatedPaymentMethodModel.nullish(),
  invoice: RelatedInvoiceModel.nullish(),
}))
