import { OrderStatusEnum } from "db"

export const OrderStatusesEnum = {
  PENDING: {
    value: OrderStatusEnum.PENDING,
    nameEn: "Pending",
    nameRu: "В ожидании",
  },
  PROCESSING: {
    value: OrderStatusEnum.PROCESSING,
    nameEn: "Processing",
    nameRu: "В обработке",
  },
  COMPLETED: {
    value: OrderStatusEnum.COMPLETED,
    nameEn: "Completed",
    nameRu: "Завершено",
  },
  CANCELLED: {
    value: OrderStatusEnum.CANCELLED,
    nameEn: "Cancelled",
    nameRu: "Отменено",
  },
  ON_HOLD: {
    value: OrderStatusEnum.ON_HOLD,
    nameEn: "On hold",
    nameRu: "В ожидании",
  },
  SHIPPED: {
    value: OrderStatusEnum.SHIPPED,
    nameEn: "Shipped",
    nameRu: "Отправлено",
  },
  DELIVERED: {
    value: OrderStatusEnum.DELIVERED,
    nameEn: "Delivered",
    nameRu: "Доставлено",
  },
  REFUND_REQUESTED: {
    value: OrderStatusEnum.REFUND_REQUESTED,
    nameEn: "Refund requested",
    nameRu: "Запрошен возврат",
  },
  REFUND_REJECTED: {
    value: OrderStatusEnum.REFUND_REJECTED,
    nameEn: "Refund rejected",
    nameRu: "Возврат отклонен",
  },
  REFUND_APPROVED: {
    value: OrderStatusEnum.REFUND_APPROVED,
    nameEn: "Refund approved",
    nameRu: "Возврат утвержден",
  },
  REFUNDED: {
    value: OrderStatusEnum.REFUNDED,
    nameEn: "Refunded",
    nameRu: "Возвращено",
  },
  PARTIALLY_COMPLETED: {
    value: OrderStatusEnum.PARTIALLY_COMPLETED,
    nameEn: "Partially completed",
    nameRu: "Частично возвращено",
  },
}

export const OrderStatusesArray = Object.values(OrderStatusesEnum).map((status) => status)
