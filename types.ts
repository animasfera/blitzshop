import { SimpleRolesIsAuthorized } from "@blitzjs/auth"
import {
  Cart,
  CartToItem,
  Category,
  ChatRoom,
  Image,
  ImageToItem,
  Invoice,
  Item,
  Location,
  Message,
  Prisma,
  PrismaClient,
  PurchasedItem,
  Review,
  User,
  UserRoleEnum,
  UserToChatRoom,
  CurrencyEnum,
  DeliveryCity,
  DeliveryCountry,
  DeliveryRegion,
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
        countryIsoCode?: User["countryIsoCode"]
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
  price: number
  currency: CurrencyEnum
  category: Category | null
  images: (ImageToItem & { image: Image })[]
  location: Location | null
  user: User | null
  reviews: Review[]
}

export type ChatRoomWithFirstMessage = ChatRoom & {
  users: (UserToChatRoom & { user: UserCardProps })[]
  messages: (Message & { sender: UserMain })[]
}

export type CartItemWithItem = CartToItem & {
  item: Item & {
    images: (ImageToItem & {
      image: Image
    })[]
  }
}

export type PreOrderItem = Pick<PurchasedItem, "title" | "itemId" | "qty" | "price"> & {
  imageUrl?: string
}

export type CartWithCartToItem = Cart & { cartToItems: CartItemWithItem[] }

export type SelectFieldOption = { label: string; value: number | string }

export type DeliveryCountryFull = DeliveryCountry & {
  regions: (DeliveryRegion & {
    country: DeliveryCountry
    cities: (DeliveryCity & {
      region: DeliveryRegion
    })[]
  })[]
}
