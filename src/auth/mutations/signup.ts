import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db, { CountryFilterEnum, CurrencyEnum, LocaleEnum, UserRoleEnum } from "db"
import { Signup } from "../schemas"

export default resolver.pipe(resolver.zod(Signup), async ({ username, email, password }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())
  const user = await db.user.create({
    data: { username, email: email.toLowerCase().trim(), hashedPassword, role: UserRoleEnum.USER },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      timezone: true,
      avatarUrl: true,
      locale: true,
      currency: true,
      buyingInCountries: true,
    },
  })

  await ctx.session.$create({
    userId: user.id,
    role: user.role as UserRoleEnum,
    timezone: user.timezone || "Etc/Greenwich",
    user: {
      id: user.id,
      username: user.username,
      avatarUrl: user.avatarUrl || "",
      role: user.role as UserRoleEnum,
      timezone: user.timezone || "Etc/Greenwich",
      locale: user.locale || ("en" as LocaleEnum),
      currency: user.currency as CurrencyEnum,
      buyingInCountries: user.buyingInCountries as CountryFilterEnum,
    },
  })
  return user
})
