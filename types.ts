import { SimpleRolesIsAuthorized } from "@blitzjs/auth"
import { User, UserRoleEnum } from "db"

declare module "@blitzjs/auth" {
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<UserRoleEnum>
    PublicData: {
      userId: User["id"]
      role: UserRoleEnum
    }
  }
}
