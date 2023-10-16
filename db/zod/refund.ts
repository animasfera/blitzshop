import * as z from "zod"
import { RefundStatusEnum, CurrencyEnum } from "@prisma/client"
import { CompletePaymentMethod, RelatedPaymentMethodModel, CompleteUser, RelatedUserModel, CompleteOrder, RelatedOrderModel, CompleteChatRoom, RelatedChatRoomModel, CompleteItemToRefund, RelatedItemToRefundModel } from "./index"

export const RefundModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  notes: z.string().nullish(),
  refundedAt: z.date().nullish(),
  status: z.nativeEnum(RefundStatusEnum),
  amount: z.number().int(),
  currency: z.nativeEnum(CurrencyEnum),
  refundMethodId: z.number().int(),
  processedById: z.number().int().nullish(),
  orderId: z.number().int(),
  chatRoomId: z.number().int().nullish(),
  userId: z.number().int(),
})

export interface CompleteRefund extends z.infer<typeof RefundModel> {
  refundMethod: CompletePaymentMethod
  processedBy?: CompleteUser | null
  order: CompleteOrder
  chatRoom?: CompleteChatRoom | null
  user: CompleteUser
  itemToRefund: CompleteItemToRefund[]
}

/**
 * RelatedRefundModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRefundModel: z.ZodSchema<CompleteRefund> = z.lazy(() => RefundModel.extend({
  refundMethod: RelatedPaymentMethodModel,
  processedBy: RelatedUserModel.nullish(),
  order: RelatedOrderModel,
  chatRoom: RelatedChatRoomModel.nullish(),
  user: RelatedUserModel,
  itemToRefund: RelatedItemToRefundModel.array(),
}))
