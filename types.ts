import { SimpleRolesIsAuthorized } from "@blitzjs/auth"
import {
  User,
  UserRoleEnum,
  LocaleEnum,
  CurrencyEnum,
  CountryFilterEnum,
  ChatRoom,
  Message,
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
        username: string
        avatarUrl: string
        role: UserRoleEnum
        timezone: string
        locale?: LocaleEnum
        currency: CurrencyEnum
        buyingInCountries?: CountryFilterEnum
      }
    }
  }
}

export type UserMain = Partial<User> & Pick<User, "username" | "avatarUrl" | "id">
export type UserCardProps = UserMain & User
export type UserMailProps = Partial<User> & Pick<User, "email" | "id" | "username" | "locale">

export type ChatRoomWithFirstMessage = ChatRoom & {
  users: (UserToChatRoom & { user: UserCardProps })[]
  messages: (Message & { sender: UserMain })[]
}
