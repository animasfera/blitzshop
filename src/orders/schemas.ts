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
    paymentMethodId: z.number(),
  })
)

export type CreateOrderType = z.infer<typeof CreateOrderSchema>

export const UpdateOrderSchema = CreateOrderSchema.partial().merge(withIdOfSchema(OrderModel))

export const DeleteOrderSchema = OrderModel.pick({
  id: true,
})
