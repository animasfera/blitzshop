import { Ctx } from "blitz"
import { hash256 } from "@blitzjs/auth"
import { Routes } from "@blitzjs/next"
import { resolver } from "@blitzjs/rpc"
import { SecurePassword } from "@blitzjs/auth/secure-password"
import {
  LocaleEnum,
  NotificationTypeEnum,
  Prisma,
  TokenTypeEnum,
  UserRoleEnum,
} from "@prisma/client"
import db from "db"

import i18n from "src/core/i18n"
import { Signup } from "src/auth/schemas"
import { ConflictError } from "src/core/errors/Errors"
import getCart from "../../carts/queries/getCart"
import mergeCarts from "src/carts/mutations/mergeCarts"
import createCart from "../../carts/mutations/createCart"

export default resolver.pipe(
  resolver.zod(Signup),
  async ({ username, email, password, countryIsoCode, locale, timezone }, ctx: Ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())
    const emailToken = Math.floor(Math.random() * 1000000) + ""
    const hashedToken = hash256(emailToken)

    const emailTrimmed = email.toLowerCase().trim()

    const userData = {
      data: {
        username: username.toLowerCase().trim(),
        email: emailTrimmed,
        hashedPassword,
        countryIsoCode,
        timezone: timezone || null,
        role: UserRoleEnum.USER,
        locale: locale || LocaleEnum.EN,
        tokens: {
          create: {
            type: TokenTypeEnum.CONFIRM_EMAIL,
            hashedToken: hashedToken,
            sentTo: emailTrimmed,
            expiresAt: new Date(),
          },
        },
      },
    } as { data: Prisma.UserCreateInput }

    const findUserByEmail = await db.user.findFirst({
      where: { OR: { email } },
    })

    if (findUserByEmail) {
      throw new ConflictError("A user with this email address is already registered.")
    }

    const findUserByUsername = await db.user.findFirst({
      where: { OR: { username } },
    })

    if (findUserByUsername) {
      throw new ConflictError("This username is already taken.")
    }

    const user = await db.user.create({
      ...userData,
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        timezone: true,
        avatarUrl: true,
        locale: true,
        currency: true,
        buyingInCountries: true,
      },
    })

    const privateSessData = await ctx.session.$getPrivateData()
    let cartUnlogged = await getCart({ id: privateSessData.cartId }, ctx)

    // TODO: Send the email

    if (ctx)
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

    await i18n.changeLanguage(user.locale)
    if (cartUnlogged && cartUnlogged.cartToItems.length > 0) {
      let loggedCart = await getCart({ userId: user.id }, ctx)
      await mergeCarts({ mergeToCartId: loggedCart.id, mergeFromCartId: cartUnlogged.id }, ctx)
    }

    // TODO: create Notification

    return user
  }
)
