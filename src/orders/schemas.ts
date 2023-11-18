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
  log: (OrderLog & {
    user: {
      email: string
      id: number
      username: string
      firstName: string | null
      lastName: string | null
      phone: string | null
      avatarUrl: string | null
    } | null
  })[]
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
export const OrderStatus = {
  PENDING: "Создан, но не обработан", // Заказ создан, но еще не обработан
  PAYMENT: "В ожидании оплаты", // Заказ находится в ожидании оплаты
  PROCESSING: "В обработке", // Заказ находится в процессе обработки и подготовки к доставке
  COMPLETED: "Выполнен и доставлен", // Заказ успешно выполнен и доставлен клиенту
  CANCELLED: "Отменен", // Заказ отменен по какой-либо причине
  ON_HOLD: "Приостановлен", // Заказ приостановлен и ожидает решения или действий со стороны клиента или магазина
  SHIPPED: "Отправлен", // Заказ был отправлен или передан службе доставки.
  DELIVERED: "Доставлен", // Заказ доставлен клиенту
  REFUND_REQUESTED: "Запрос на возврат", // Был сделан запрос на возврат
  REFUND_REJECTED: "Запрос на возврат отклонен", // Запрос на возврат отклонен
  REFUND_APPROVED: "Запрос на возврат потвержден", // Утвержден запрос на возврат
  REFUNDED: "Возврат завершен", // Заказ был возвращен, и клиенту был осуществлен возврат средств
  PARTIALLY_COMPLETED: "Частично выполнен", // Заказ частично выполнен, если в нем есть несколько товаров, и не все из них были доставлены или выполнены
}
