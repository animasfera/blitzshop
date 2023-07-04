import * as z from "zod"
import { TransactionStatusEnum, TransactionTypeEnum } from "@prisma/client"
import { CompletePrice, RelatedPriceModel, CompletePaymentMethod, RelatedPaymentMethodModel, CompleteInvoice, RelatedInvoiceModel, CompleteUser, RelatedUserModel } from "./index"

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
  description: z.string(),
  failureReason: z.string().nullish(),
  failReasonCode: z.number().int().nullish(),
  metadata: jsonSchema,
  receiptUrl: z.string().nullish(),
  status: z.nativeEnum(TransactionStatusEnum),
  type: z.nativeEnum(TransactionTypeEnum),
  amountId: z.number().int(),
  feeTotalId: z.number().int(),
  netId: z.number().int(),
  paymentMethodId: z.number().int(),
  invoiceId: z.number().int(),
  userId: z.number().int(),
})

export interface CompleteTransaction extends z.infer<typeof TransactionModel> {
  amount: CompletePrice
  feeTotal: CompletePrice
  net: CompletePrice
  paymentMethod: CompletePaymentMethod
  invoice: CompleteInvoice
  user: CompleteUser
}

/**
 * RelatedTransactionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTransactionModel: z.ZodSchema<CompleteTransaction> = z.lazy(() => TransactionModel.extend({
  amount: RelatedPriceModel,
  feeTotal: RelatedPriceModel,
  net: RelatedPriceModel,
  paymentMethod: RelatedPaymentMethodModel,
  invoice: RelatedInvoiceModel,
  user: RelatedUserModel,
}))
