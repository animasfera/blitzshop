import * as z from "zod"
import { ItemStatusEnum, AccessTypeEnum, CurrencyEnum } from "@prisma/client"
import { CompleteCategory, RelatedCategoryModel, CompleteUser, RelatedUserModel, CompleteLocation, RelatedLocationModel, CompleteChatRoom, RelatedChatRoomModel, CompleteImageToItem, RelatedImageToItemModel, CompleteReview, RelatedReviewModel, CompletePurchasedItem, RelatedPurchasedItemModel, CompleteCartToItem, RelatedCartToItemModel } from "./index"

export const ItemModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  title: z.string(),
  description: z.string(),
  color: z.string().nullish(),
  qty: z.number().int(),
  weight: z.number().int(),
  rating: z.number(),
  isFeatured: z.boolean(),
  status: z.nativeEnum(ItemStatusEnum).nullish(),
  access: z.nativeEnum(AccessTypeEnum),
  categoryId: z.number().int().nullish(),
  price: z.number().int(),
  currency: z.nativeEnum(CurrencyEnum),
  userId: z.number().int().nullish(),
  locationId: z.number().int().nullish(),
  chatRoomId: z.number().int().nullish(),
})

export interface CompleteItem extends z.infer<typeof ItemModel> {
  category?: CompleteCategory | null
  user?: CompleteUser | null
  location?: CompleteLocation | null
  chatRoom?: CompleteChatRoom | null
  images: CompleteImageToItem[]
  reviews: CompleteReview[]
  purchasedItems: CompletePurchasedItem[]
  cartToItems: CompleteCartToItem[]
}

/**
 * RelatedItemModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedItemModel: z.ZodSchema<CompleteItem> = z.lazy(() => ItemModel.extend({
  category: RelatedCategoryModel.nullish(),
  user: RelatedUserModel.nullish(),
  location: RelatedLocationModel.nullish(),
  chatRoom: RelatedChatRoomModel.nullish(),
  images: RelatedImageToItemModel.array(),
  reviews: RelatedReviewModel.array(),
  purchasedItems: RelatedPurchasedItemModel.array(),
  cartToItems: RelatedCartToItemModel.array(),
}))
