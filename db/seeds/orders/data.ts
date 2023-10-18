import { OrderStatusEnum } from "db"

import { users } from "db/seeds/users/data"
import { items } from "db/seeds/items/data"

export const orders = [
  {
    items: [items.agniBig],
    status: OrderStatusEnum.CANCELLED,
    user: users.roma,
  },
  {
    items: [items.amarant, items.vayoBig],
    status: OrderStatusEnum.COMPLETED,
    user: users.roma,
  },
  {
    items: [items.agniMini],
    status: OrderStatusEnum.DELIVERED,
    user: users.mkdir,
  },
  {
    items: [items.bubing, items.vayoMini],
    status: OrderStatusEnum.ON_HOLD,
    user: users.mkdir,
  },
  {
    items: [items.jalaBig],
    status: OrderStatusEnum.PARTIALLY_COMPLETED,
    user: users.moderator,
  },
  {
    items: [items.jalaMini, items.venge],
    status: OrderStatusEnum.PENDING,
    user: users.moderator,
  },
  {
    items: [items.leela],
    status: OrderStatusEnum.PROCESSING,
    user: users.moderator,
  },
  {
    items: [items.master, items.yamunaMini],
    status: OrderStatusEnum.REFUNDED,
    user: users.user,
  },
  {
    items: [items.moryoniyDub],
    status: OrderStatusEnum.REFUND_APPROVED,
    user: users.user,
  },
  {
    items: [items.paduk, items.yantar],
    status: OrderStatusEnum.REFUND_REJECTED,
    user: users.user,
  },
  {
    items: [items.prithviBig],
    status: OrderStatusEnum.REFUND_REQUESTED,
    user: users.videolimiter,
  },
  {
    items: [items.prithviMini, items.zebrano],
    status: OrderStatusEnum.SHIPPED,
    user: users.videolimiter,
  },
]
