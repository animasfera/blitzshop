import * as z from "zod"
import { OrderStatusEnum, CurrencyEnum, DutyPaymentEnum, ShippingCompanyEnum } from "@prisma/client"
import { CompleteOrderLog, RelatedOrderLogModel, CompleteUser, RelatedUserModel, CompletePurchasedItem, RelatedPurchasedItemModel, CompleteRefund, RelatedRefundModel, CompleteInvoice, RelatedInvoiceModel, CompleteShippingAddress, RelatedShippingAddressModel } from "./index"

export const OrderModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  couponCode: z.string().nullish(),
  notes: z.string().nullish(),
  status: z.nativeEnum(OrderStatusEnum),
  subtotal: z.number().int(),
  total: z.number().int(),
  net: z.number().int(),
  currency: z.nativeEnum(CurrencyEnum),
  userId: z.number().int(),
  invoiceId: z.number().int().nullish(),
  shippingFee: z.number().int(),
  shippingDutyFee: z.number().int().nullish(),
  shippingInsuranceFee: z.number().int().nullish(),
  shippingPackageFee: z.number().int().nullish(),
  shippingAddressId: z.number().int().nullish(),
  shippingDutyPayment: z.nativeEnum(DutyPaymentEnum).nullish(),
  shippingInsurance: z.boolean(),
  shippingTrackingId: z.string().nullish(),
  shippingCompany: z.nativeEnum(ShippingCompanyEnum).nullish(),
})

export interface CompleteOrder extends z.infer<typeof OrderModel> {
  log: CompleteOrderLog[]
  user: CompleteUser
  items: CompletePurchasedItem[]
  refunds: CompleteRefund[]
  invoice?: CompleteInvoice | null
  shippingAddress?: CompleteShippingAddress | null
}

/**
 * RelatedOrderModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrderModel: z.ZodSchema<CompleteOrder> = z.lazy(() => OrderModel.extend({
  log: RelatedOrderLogModel.array(),
  user: RelatedUserModel,
  items: RelatedPurchasedItemModel.array(),
  refunds: RelatedRefundModel.array(),
  invoice: RelatedInvoiceModel.nullish(),
  shippingAddress: RelatedShippingAddressModel.nullish(),
}))
