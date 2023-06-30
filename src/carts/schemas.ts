import { z } from "zod"
import { CartModel } from "db/zod"

export const CreateCartSchema = CartModel.pick({
  numItems: true,
  sessionId: true,
  amountId: true,
  userId: true,
  mergedCartId: true,
})

export const UpdateCartSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteCartSchema = z.object({
  id: z.number(),
})
