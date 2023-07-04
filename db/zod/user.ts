import * as z from "zod"
import { UserRoleEnum, UserStatusEnum, CountryFilterEnum, CurrencyEnum } from "@prisma/client"
import { CompleteConfig, RelatedConfigModel, CompleteToken, RelatedTokenModel, CompleteSession, RelatedSessionModel, CompleteCardToken, RelatedCardTokenModel, CompleteNotification, RelatedNotificationModel, CompleteReview, RelatedReviewModel, CompleteItem, RelatedItemModel, CompleteCart, RelatedCartModel, CompleteOrder, RelatedOrderModel, CompleteShippingAddress, RelatedShippingAddressModel, CompleteRefund, RelatedRefundModel, CompleteTransaction, RelatedTransactionModel } from "./index"

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
  locale: z.string(),
  avatarUrl: z.string(),
  role: z.nativeEnum(UserRoleEnum),
  status: z.nativeEnum(UserStatusEnum),
  buyingInCountries: z.nativeEnum(CountryFilterEnum),
  currency: z.nativeEnum(CurrencyEnum),
  configKey: z.string().nullish(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  config?: CompleteConfig | null
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
  transactions: CompleteTransaction[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  config: RelatedConfigModel.nullish(),
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
  transactions: RelatedTransactionModel.array(),
}))
