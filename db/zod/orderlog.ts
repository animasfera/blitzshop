import * as z from "zod"
import { OrderStatusEnum } from "@prisma/client"

export const OrderLogModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  status: z.nativeEnum(OrderStatusEnum),
  comment: z.string().nullish(),
})
