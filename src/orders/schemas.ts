import { z } from "zod"
import { OrderModel, PurchasedItemModel } from "db/zod"
import { withIdOfSchema } from "../../db/zodCore"

export const CreateOrderSchema = OrderModel.pick({
  shippingFee: true,
  subtotal: true,
  total: true,
  shippingMethodId: true,
}).merge(
  z.object({
    items: z.array(
      PurchasedItemModel.pick({
        itemId: true,
        qty: true,
        price: true,
      })
    ),
    currency: z.enum(["EUR", "RUB"]),
  })
)

export type CreateOrderType = z.infer<typeof CreateOrderSchema>

export const UpdateOrderSchema = OrderModel.pick({
  id: true,
  shippingFee: true,
  subtotal: true,
  total: true,
  shippingMethodId: true,
  status: true,
  couponCode: true,
  notes: true,
}).partial({
  notes: true,
  couponCode: true,
  shippingFee: true,
  subtotal: true,
  total: true,
  shippingMethodId: true,
  status: true,
})

export type UpdateOrderSchemaType = z.infer<typeof UpdateOrderSchema>

export const DeleteOrderSchema = OrderModel.pick({
  id: true,
})
