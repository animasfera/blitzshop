import { SimpleRolesIsAuthorized } from "@blitzjs/auth"
import {
  Cart,
  CartToItem,
  Category,
  ChatRoom,
  CountryFilterEnum,
  CurrencyEnum,
  Image,
  ImageToItem,
  Invoice,
  Item,
  LocaleEnum,
  Location,
  Message,
  PaymentMethod,
  Price,
  Prisma,
  PrismaClient,
  PurchasedItem,
  Review,
  User,
  UserRoleEnum,
  UserToChatRoom,
} from "db"

declare module "@blitzjs/auth" {
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<UserRoleEnum>
    PublicData: {
      userId: User["id"]
      role: UserRoleEnum
      timezone: string
      user: {
        id: User["id"]
        username: User["username"]
        firstName: User["firstName"]
        lastName: User["lastName"]
        avatarUrl: User["avatarUrl"]
        role: User["username"]
        timezone: User["timezone"]
        locale?: User["locale"]
        currency: User["currency"]
        buyingInCountries?: User["buyingInCountries"]
      }
    }
  }
}

export type PrismaDbType =
  | PrismaClient<Prisma.PrismaClientOptions, any, any>
  | Omit<
      PrismaClient<
        Prisma.PrismaClientOptions,
        never,
        Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
      >,
      "$connect" | "$disconnect" | "$on" | "$transaction" | "$use"
    >

export type UserMain = Partial<User> & Pick<User, "username" | "avatarUrl" | "id">
export type UserCardProps = UserMain & User
export type UserMailProps = Partial<User> & Pick<User, "email" | "id" | "username" | "locale">

export type ItemFull = Item & {
  _count: Prisma.ItemCountOutputType
  amount: Price
  cartToItems: CartToItem[]
  category: Category | null
  coverImage: ImageToItem & { image: Image }
  chatRoom: ChatRoom | null
  images: ImageToItem[]
  invoices: Invoice[]
  location: Location | null
  user: User | null
  purchasedItems: PurchasedItem[]
  reviews: Review[]
}

export type ChatRoomWithFirstMessage = ChatRoom & {
  users: (UserToChatRoom & { user: UserCardProps })[]
  messages: (Message & { sender: UserMain })[]
}
