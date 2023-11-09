import * as z from "zod"
import { OrderStatusEnum, CurrencyEnum } from "@prisma/client"
import { CompleteOrderLog, RelatedOrderLogModel, CompleteShippingMethod, RelatedShippingMethodModel, CompleteUser, RelatedUserModel, CompletePurchasedItem, RelatedPurchasedItemModel, CompleteShippingAddress, RelatedShippingAddressModel, CompleteRefund, RelatedRefundModel, CompleteInvoice, RelatedInvoiceModel } from "./index"

export const OrderModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  couponCode: z.string().nullish(),
  notes: z.string().nullish(),
  status: z.nativeEnum(OrderStatusEnum),
  subtotal: z.number().int(),
  shippingFee: z.number().int(),
  total: z.number().int(),
  net: z.number().int(),
  currency: z.nativeEnum(CurrencyEnum),
  logId: z.number().int(),
  shippingMethodId: z.number().int().nullish(),
  userId: z.number().int(),
  shippingAddressId: z.number().int().nullish(),
  invoiceId: z.number().int(),
})

export interface CompleteOrder extends z.infer<typeof OrderModel> {
  log: CompleteOrderLog
  shippingMethod?: CompleteShippingMethod | null
  user: CompleteUser
  items: CompletePurchasedItem[]
  shippingAddress?: CompleteShippingAddress | null
  refunds: CompleteRefund[]
  invoice: CompleteInvoice
}

/**
 * RelatedOrderModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrderModel: z.ZodSchema<CompleteOrder> = z.lazy(() => OrderModel.extend({
  log: RelatedOrderLogModel,
  shippingMethod: RelatedShippingMethodModel.nullish(),
  user: RelatedUserModel,
  items: RelatedPurchasedItemModel.array(),
  shippingAddress: RelatedShippingAddressModel.nullish(),
  refunds: RelatedRefundModel.array(),
  invoice: RelatedInvoiceModel,
}))
