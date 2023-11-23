import { z } from "zod"
import { OrderModel, PurchasedItemModel, ShippingAddressModel } from "db/zod"
import { withIdOfSchema } from "../../db/zodCore"
import {
  Category,
  Country,
  Image,
  Item,
  Order,
  OrderLog,
  PurchasedItem,
  ShippingAddress,
} from "../../db"
import { DeliveryMethodEnum, Invoice, ShippingCompanyEnum } from "@prisma/client"

export const CreateOrderSchema = OrderModel.pick({
  shippingFee: true,
  subtotal: true,
  total: true,
  shippingMethodId: true,
}).merge(
  z.object({
    shippingAddress: ShippingAddressModel.pick({
      // deliveryMethod: true,
      // company: z.nativeEnum(ShippingCompanyEnum),
      firstName: true,
      lastName: true,
      phone: true,
      // instructions: z.string().nullish(),
      address: true,
      city: true,
      // cityId: z.number().int().nullish(),
      province: true,
      // provinceId: z.number().int().nullish(),
      postalCode: true,
      countryId: true,
    }),
    items: z.array(
      PurchasedItemModel.pick({
        itemId: true,
        qty: true,
        price: true,
      })
    ),
  })
)

export type CreateOrderType = z.infer<typeof CreateOrderSchema>

export const UpdateOrderSchema = OrderModel.partial().merge(withIdOfSchema(OrderModel))

export type UpdateOrderSchemaType = z.infer<typeof UpdateOrderSchema>

export const DeleteOrderSchema = OrderModel.pick({
  id: true,
})

export type OrderFull = Order & {
  user: {
    email: string
    id: number
    username: string
    firstName: string | null
    lastName: string | null
    phone: string | null
    avatarUrl: string | null
  }
  invoice: Invoice | null
  log: OrderLog[]

  shippingAddress:
    | (ShippingAddress & {
        country: Country
      })
    | null
  items: (PurchasedItem & {
    category: Category | null
    item: Item & {
      user: {
        email: string
        id: number
        username: string
      } | null
    }
    coverImage: Image
  })[]
}
