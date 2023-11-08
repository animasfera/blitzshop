import * as z from "zod"
import { ItemStatusEnum, AccessTypeEnum } from "@prisma/client"
import { CompleteCategory, RelatedCategoryModel, CompletePrice, RelatedPriceModel, CompleteImageToItem, RelatedImageToItemModel, CompleteUser, RelatedUserModel, CompleteLocation, RelatedLocationModel, CompleteChatRoom, RelatedChatRoomModel, CompleteReview, RelatedReviewModel, CompletePurchasedItem, RelatedPurchasedItemModel, CompleteInvoice, RelatedInvoiceModel, CompleteCartToItem, RelatedCartToItemModel } from "./index"

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
  amountId: z.number().int(),
  coverImageId: z.number().int(),
  userId: z.number().int().nullish(),
  locationId: z.number().int().nullish(),
  chatRoomId: z.number().int().nullish(),
  width: z.number().int().nullish(),
  height: z.number().int().nullish(),
  lenght: z.number().int().nullish(),
})

export interface CompleteItem extends z.infer<typeof ItemModel> {
  category?: CompleteCategory | null
  amount: CompletePrice
  coverImage: CompleteImageToItem
  user?: CompleteUser | null
  location?: CompleteLocation | null
  chatRoom?: CompleteChatRoom | null
  images: CompleteImageToItem[]
  reviews: CompleteReview[]
  purchasedItems: CompletePurchasedItem[]
  invoices: CompleteInvoice[]
  cartToItems: CompleteCartToItem[]
}

/**
 * RelatedItemModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedItemModel: z.ZodSchema<CompleteItem> = z.lazy(() => ItemModel.extend({
  category: RelatedCategoryModel.nullish(),
  amount: RelatedPriceModel,
  coverImage: RelatedImageToItemModel,
  user: RelatedUserModel.nullish(),
  location: RelatedLocationModel.nullish(),
  chatRoom: RelatedChatRoomModel.nullish(),
  images: RelatedImageToItemModel.array(),
  reviews: RelatedReviewModel.array(),
  purchasedItems: RelatedPurchasedItemModel.array(),
  invoices: RelatedInvoiceModel.array(),
  cartToItems: RelatedCartToItemModel.array(),
}))
