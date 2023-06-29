import { z } from "zod"
import { ReviewModel } from "db/zod"

export const CreateReviewSchema = ReviewModel.pick({
  message: true,
  status: true,
  reply: true,
  rating: true,
  senderId: true,
})

export const UpdateReviewSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteReviewSchema = z.object({
  id: z.number(),
})
