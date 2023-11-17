import * as z from "zod"
import { LocaleEnum, UserRoleEnum, UserStatusEnum, CountryFilterEnum, CurrencyEnum } from "@prisma/client"
import { CompleteLocation, RelatedLocationModel, CompleteToken, RelatedTokenModel, CompleteSession, RelatedSessionModel, CompleteCardToken, RelatedCardTokenModel, CompleteNotification, RelatedNotificationModel, CompleteReview, RelatedReviewModel, CompleteItem, RelatedItemModel, CompleteCart, RelatedCartModel, CompleteOrder, RelatedOrderModel, CompleteShippingAddress, RelatedShippingAddressModel, CompleteRefund, RelatedRefundModel, CompleteMessage, RelatedMessageModel, CompleteUserToChatRoom, RelatedUserToChatRoomModel, CompleteConfig, RelatedConfigModel, CompleteOrderLog, RelatedOrderLogModel } from "./index"

export const UserModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  username: z.string(),
  email: z.string(),
  emailConfirmed: z.boolean(),
  countryIsoCode: z.string(),
  phone: z.string().nullish(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  hashedPassword: z.string().nullish(),
  timezone: z.string(),
  locale: z.nativeEnum(LocaleEnum),
  avatarUrl: z.string(),
  role: z.nativeEnum(UserRoleEnum),
  status: z.nativeEnum(UserStatusEnum),
  buyingInCountries: z.nativeEnum(CountryFilterEnum),
  currency: z.nativeEnum(CurrencyEnum),
  locationId: z.number().int().nullish(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  location?: CompleteLocation | null
  tokens: CompleteToken[]
  sessions: CompleteSession[]
  cardTokens: CompleteCardToken[]
  notifications: CompleteNotification[]
  reviews: CompleteReview[]
  items: CompleteItem[]
  carts: CompleteCart[]
  orders: CompleteOrder[]
  shippingAddresses: CompleteShippingAddress[]
  refundProcessedByUser: CompleteRefund[]
  refunds: CompleteRefund[]
  messages: CompleteMessage[]
  messageRooms: CompleteUserToChatRoom[]
  configs: CompleteConfig[]
  orderLog: CompleteOrderLog[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  location: RelatedLocationModel.nullish(),
  tokens: RelatedTokenModel.array(),
  sessions: RelatedSessionModel.array(),
  cardTokens: RelatedCardTokenModel.array(),
  notifications: RelatedNotificationModel.array(),
  reviews: RelatedReviewModel.array(),
  items: RelatedItemModel.array(),
  carts: RelatedCartModel.array(),
  orders: RelatedOrderModel.array(),
  shippingAddresses: RelatedShippingAddressModel.array(),
  refundProcessedByUser: RelatedRefundModel.array(),
  refunds: RelatedRefundModel.array(),
  messages: RelatedMessageModel.array(),
  messageRooms: RelatedUserToChatRoomModel.array(),
  configs: RelatedConfigModel.array(),
  orderLog: RelatedOrderLogModel.array(),
}))
