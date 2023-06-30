import * as z from "zod"
import { ReviewStatusEnum } from "@prisma/client"
import { CompleteUser, RelatedUserModel, CompleteItem, RelatedItemModel } from "./index"

export const ReviewModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  message: z.string(),
  reply: z.string().nullish(),
  rating: z.number(),
  status: z.nativeEnum(ReviewStatusEnum),
  senderId: z.number().int(),
  itemId: z.number().int(),
})

export interface CompleteReview extends z.infer<typeof ReviewModel> {
  sender: CompleteUser
  item: CompleteItem
}

/**
 * RelatedReviewModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedReviewModel: z.ZodSchema<CompleteReview> = z.lazy(() =>
  ReviewModel.extend({
    sender: RelatedUserModel,
    item: RelatedItemModel,
  })
)
