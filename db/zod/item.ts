import * as z from "zod"
import { ItemStatusEnum, AccessTypeEnum } from "@prisma/client"
import {
  CompleteCategory,
  RelatedCategoryModel,
  CompletePrice,
  RelatedPriceModel,
  CompleteImageToItem,
  RelatedImageToItemModel,
  CompleteUser,
  RelatedUserModel,
  CompleteCart,
  RelatedCartModel,
  CompleteReview,
  RelatedReviewModel,
} from "./index"

export const ItemModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  title: z.string(),
  description: z.string(),
  qty: z.number().int(),
  weight: z.number().int(),
  rating: z.number(),
  isFeatured: z.boolean(),
  status: z.nativeEnum(ItemStatusEnum),
  access: z.nativeEnum(AccessTypeEnum),
  categoryId: z.number().int().nullish(),
  priceId: z.number().int().nullish(),
  coverImageId: z.number().int(),
  userId: z.number().int().nullish(),
  cartId: z.number().int().nullish(),
})

export interface CompleteItem extends z.infer<typeof ItemModel> {
  category?: CompleteCategory | null
  amount?: CompletePrice | null
  coverImage: CompleteImageToItem
  user?: CompleteUser | null
  cart?: CompleteCart | null
  images: CompleteImageToItem[]
  reviews: CompleteReview[]
}

/**
 * RelatedItemModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedItemModel: z.ZodSchema<CompleteItem> = z.lazy(() =>
  ItemModel.extend({
    category: RelatedCategoryModel.nullish(),
    amount: RelatedPriceModel.nullish(),
    coverImage: RelatedImageToItemModel,
    user: RelatedUserModel.nullish(),
    cart: RelatedCartModel.nullish(),
    images: RelatedImageToItemModel.array(),
    reviews: RelatedReviewModel.array(),
  })
)
