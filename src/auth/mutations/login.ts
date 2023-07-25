import { AuthenticationError } from "blitz"
import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { LocaleEnum, UserRoleEnum, UserStatusEnum } from "@prisma/client"

import getConfigs from "src/configs/queries/getConfigs"
import { LoginProhibitedError } from "src/core/errors/Errors"
import { Login } from "../schemas"

export const authenticateUser = async (rawEmail: string, rawPassword: string, ctx) => {
  const { email, password } = Login.parse({ email: rawEmail, password: rawPassword })
  const user = await db.user.findFirst({
    where: { email },
    include: {
      config: true,
    },
  })
  const { configs } = await getConfigs({}, ctx)

  if (!user) throw new AuthenticationError()
  if (user && !(user.status !== UserStatusEnum.BLOCKED))
    throw new AuthenticationError("User Blocked")

  if (!configs.allowLogin && user.role !== UserRoleEnum.ADMIN) {
    throw new LoginProhibitedError()
  }

  const result = await SecurePassword.verify(user.hashedPassword, password)

  if (result === SecurePassword.VALID_NEEDS_REHASH) {
    // Upgrade hashed password with a more secure hash
    const improvedHash = await SecurePassword.hash(password)
    await db.user.update({ where: { id: user.id }, data: { hashedPassword: improvedHash } })
  }

  const { hashedPassword, ...rest } = user
  return rest
}

export default resolver.pipe(resolver.zod(Login), async ({ email, password }, ctx) => {
  const user = await authenticateUser(email, password, ctx)

  await ctx.session.$create({
    userId: user.id,
    role: user.role as UserRoleEnum,
    timezone: user.timezone || "Etc/Greenwich",
    user: {
      id: user.id,
      role: user.role,
      username: user.username,
      avatarUrl: user.avatarUrl || "",
      timezone: user.timezone || "Etc/Greenwich",
      locale: user.locale || LocaleEnum.EN,
      currency: user.currency,
      buyingInCountries: user.buyingInCountries,
    },
  })

  return user
})
