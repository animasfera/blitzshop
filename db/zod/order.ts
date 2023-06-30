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
} from "./index"

export const OrderModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  status: z.nativeEnum(OrderStatusEnum),
  couponCode: z.string().nullish(),
  notes: z.string().nullish(),
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
  ShippingAddress: CompleteShippingAddress[]
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
    ShippingAddress: RelatedShippingAddressModel.array(),
  })
)
