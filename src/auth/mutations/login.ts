import { AuthenticationError, Ctx } from "blitz"
import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { LocaleEnum, UserRoleEnum, UserStatusEnum } from "@prisma/client"

import { Login } from "../schemas"
import { LoginProhibitedError } from "src/core/errors/Errors"
import getConfigs from "src/configs/queries/getConfigs"
import { mergedCart } from "src/carts/mutations/mergedCart"

interface AuthenticateUserParams {
  rawEmail: string
  rawPassword: string
  rawTimezone?: string
}

export const authenticateUser = async (params: AuthenticateUserParams, ctx: Ctx) => {
  const { rawEmail, rawPassword, rawTimezone } = params

  const { email, password, timezone } = Login.parse({
    email: rawEmail,
    password: rawPassword,
    timezone: rawTimezone,
  })
  const user = await db.user.findFirst({
    where: { email },
    include: { configs: true },
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
    await db.user.update({
      where: { id: user.id },
      data: { hashedPassword: improvedHash },
    })
  }

  if (rawTimezone !== user.timezone) {
    const updateUser = await db.user.update({
      where: { id: user.id },
      data: { timezone: timezone },
    })

    const { hashedPassword, ...rest } = updateUser
    return rest
  }

  const { hashedPassword, ...rest } = user
  return rest
}

export default resolver.pipe(
  resolver.zod(Login),
  async ({ email, password, timezone, sessionId }, ctx) => {
    const user = await authenticateUser(
      { rawEmail: email, rawPassword: password, rawTimezone: timezone },
      ctx
    )

    await ctx.session.$create({
      userId: user.id,
      role: user.role as UserRoleEnum,
      timezone: user.timezone || "Etc/Greenwich",
      user: {
        id: user.id,
        role: user.role,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        avatarUrl: user.avatarUrl,
        timezone: user.timezone ?? "Etc/Greenwich",
        locale: user.locale || LocaleEnum.EN,
        currency: user.currency,
        buyingInCountries: user.buyingInCountries,
      },
    })

    await mergedCart({
      userId: user.id,
      sessionId,
      currency: user.currency,
      ctx,
    })

    return user
  }
)
