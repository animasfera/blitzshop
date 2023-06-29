import * as z from "zod"
import { UserRoleEnum, UserStatusEnum, CountryFilterEnum, CurrencyEnum } from "@prisma/client"
import {
  CompleteToken,
  RelatedTokenModel,
  CompleteSession,
  RelatedSessionModel,
  CompleteCardToken,
  RelatedCardTokenModel,
  CompleteNotification,
  RelatedNotificationModel,
  CompleteReview,
  RelatedReviewModel,
  CompleteItem,
  RelatedItemModel,
} from "./index"

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
  role: z.nativeEnum(UserRoleEnum),
  timezone: z.string(),
  locale: z.string(),
  avatarUrl: z.string(),
  status: z.nativeEnum(UserStatusEnum),
  buyingInCountries: z.nativeEnum(CountryFilterEnum),
  currency: z.nativeEnum(CurrencyEnum),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  tokens: CompleteToken[]
  sessions: CompleteSession[]
  cardTokens: CompleteCardToken[]
  notifications: CompleteNotification[]
  reviews: CompleteReview[]
  items: CompleteItem[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() =>
  UserModel.extend({
    tokens: RelatedTokenModel.array(),
    sessions: RelatedSessionModel.array(),
    cardTokens: RelatedCardTokenModel.array(),
    notifications: RelatedNotificationModel.array(),
    reviews: RelatedReviewModel.array(),
    items: RelatedItemModel.array(),
  })
)
