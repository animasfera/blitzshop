import { z } from "zod"
import { OrderLogModel } from "db/zod"

export const CreateOrderLogSchema = OrderLogModel.pick({
  orderId: true,
  status: true,
  comment: true,
  userId: true,
}).partial({ comment: true, status: true, userId: true })

export const UpdateOrderLogSchema = OrderLogModel.pick({
  id: true,
  orderId: true,
  status: true,
  comment: true,
  userId: true,
}).partial({ comment: true, status: true, userId: true, orderId: true })

export const DeleteOrderLogSchema = OrderLogModel.pick({
  id: true,
  orderId: true,
  userId: true,
}).partial({ id: true, orderId: true, userId: true })
