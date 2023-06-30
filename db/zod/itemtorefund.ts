import * as z from "zod"
import {
  CompletePurchasedItem,
  RelatedPurchasedItemModel,
  CompleteRefund,
  RelatedRefundModel,
} from "./index"

export const ItemToRefundModel = z.object({
  id: z.number().int(),
  itemId: z.number().int(),
  refundId: z.number().int(),
})

export interface CompleteItemToRefund extends z.infer<typeof ItemToRefundModel> {
  item: CompletePurchasedItem
  refund: CompleteRefund
}

/**
 * RelatedItemToRefundModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedItemToRefundModel: z.ZodSchema<CompleteItemToRefund> = z.lazy(() =>
  ItemToRefundModel.extend({
    item: RelatedPurchasedItemModel,
    refund: RelatedRefundModel,
  })
)
