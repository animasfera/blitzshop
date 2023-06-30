import * as z from "zod"
import { OrderStatusEnum } from "@prisma/client"
import {
  CompletePrice,
  RelatedPriceModel,
  CompleteOrderLog,
  RelatedOrderLogModel,
  CompleteShippingMethod,
  RelatedShippingMethodModel,
  CompleteUser,
  RelatedUserModel,
  CompletePurchasedItem,
  RelatedPurchasedItemModel,
  CompleteShippingAddress,
  RelatedShippingAddressModel,
  CompleteRefund,
  RelatedRefundModel,
  CompleteInvoice,
  RelatedInvoiceModel,
} from "./index"

export const OrderModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  couponCode: z.string().nullish(),
  notes: z.string().nullish(),
  status: z.nativeEnum(OrderStatusEnum),
  amountId: z.number().int(),
  orderLogId: z.number().int(),
  shippingMethodId: z.number().int().nullish(),
  userId: z.number().int(),
})

export interface CompleteOrder extends z.infer<typeof OrderModel> {
  amount: CompletePrice
  orderLog: CompleteOrderLog
  shippingMethod?: CompleteShippingMethod | null
  user: CompleteUser
  purchasedItems: CompletePurchasedItem[]
  shippingAddresses: CompleteShippingAddress[]
  refunds: CompleteRefund[]
  invoices: CompleteInvoice[]
}

/**
 * RelatedOrderModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrderModel: z.ZodSchema<CompleteOrder> = z.lazy(() =>
  OrderModel.extend({
    amount: RelatedPriceModel,
    orderLog: RelatedOrderLogModel,
    shippingMethod: RelatedShippingMethodModel.nullish(),
    user: RelatedUserModel,
    purchasedItems: RelatedPurchasedItemModel.array(),
    shippingAddresses: RelatedShippingAddressModel.array(),
    refunds: RelatedRefundModel.array(),
    invoices: RelatedInvoiceModel.array(),
  })
)
