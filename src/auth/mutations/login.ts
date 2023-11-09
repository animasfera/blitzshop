import { AuthenticationError, Ctx } from "blitz"
import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db, { LocaleEnum, UserRoleEnum, UserStatusEnum } from "db"

import { Login } from "src/auth/schemas"
import { LoginProhibitedError } from "src/core/errors/Errors"
import getConfigs from "src/configs/queries/getConfigs"
import getCart from "src/carts/queries/getCart"
import createCart from "src/carts/mutations/createCart"
import mergeCarts from "src/carts/mutations/mergeCarts"

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
    let cartUnlogged = await getCart({}, ctx)

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
        locale: user.locale || LocaleEnum.en,
        currency: user.currency,
        buyingInCountries: user.buyingInCountries,
      },
    })

    let loggedCart = await getCart({ userId: user.id }, ctx)
    ctx.session.$setPrivateData({
      cartId: loggedCart.id,
    })
    if (cartUnlogged && cartUnlogged.cartToItems.length > 0) {
      await mergeCarts({ mergeToCartId: loggedCart.id, mergeFromCartId: cartUnlogged.id }, ctx)
    }

    return user
  }
)
