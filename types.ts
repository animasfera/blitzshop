import { SimpleRolesIsAuthorized } from "@blitzjs/auth"
import { User, UserRoleEnum, LocaleEnum, CurrencyEnum, CountryFilterEnum } from "db"

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
