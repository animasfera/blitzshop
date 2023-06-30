import * as z from "zod"
import { RefundStatusEnum } from "@prisma/client"
import {
  CompletePrice,
  RelatedPriceModel,
  CompletePaymentMethod,
  RelatedPaymentMethodModel,
  CompleteUser,
  RelatedUserModel,
  CompleteOrder,
  RelatedOrderModel,
} from "./index"

export const RefundModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  status: z.nativeEnum(RefundStatusEnum),
  notes: z.string().nullish(),
  refundedAt: z.date().nullish(),
  amountId: z.number().int(),
  refundMethodId: z.number().int(),
  processedById: z.number().int(),
  orderId: z.number().int(),
  userId: z.number().int(),
})

export interface CompleteRefund extends z.infer<typeof RefundModel> {
  amount: CompletePrice
  refundMethod: CompletePaymentMethod
  processedBy: CompleteUser
  order: CompleteOrder
  user: CompleteUser
}

/**
 * RelatedRefundModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRefundModel: z.ZodSchema<CompleteRefund> = z.lazy(() =>
  RefundModel.extend({
    amount: RelatedPriceModel,
    refundMethod: RelatedPaymentMethodModel,
    processedBy: RelatedUserModel,
    order: RelatedOrderModel,
    user: RelatedUserModel,
  })
)
