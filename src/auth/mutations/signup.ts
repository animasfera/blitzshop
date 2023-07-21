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
import { confirmEmailAddressMailer } from "mailers/confirmEmailAddressMailer"
import createNotification from "src/notifications/mutations/createNotification"

export default resolver.pipe(
  resolver.zod(Signup),
  async ({ username, email, password, countryIsoCode, locale, timezone }, ctx?: Ctx | null) => {
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

    const user = await db.user.create({
      ...userData,
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

    // 6. Send the email
    await confirmEmailAddressMailer({ user: user, token: emailToken }, { lang: user.locale }).send()

    if (ctx)
      await ctx.session.$create({
        userId: user.id,
        role: user.role as UserRoleEnum,
        timezone: user.timezone || "Etc/Greenwich",
        user: {
          id: user.id,
          role: user.role,
          username: user.username,
          timezone: user.timezone || "Etc/Greenwich",
          avatarUrl: user.avatarUrl || "",
          locale: user.locale || LocaleEnum.EN,
          currency: user.currency,
          buyingInCountries: user.buyingInCountries,
        },
      })

    await i18n.changeLanguage(user.locale)
    await i18n.loadNamespaces(["mails"])

    const data = {
      timezoneSystem: timezone,
      settingsUrl: process.env.SITE_URL, // + Routes.SettingsPage().pathname,
    }

    await createNotification(
      {
        userId: user.id,
        type: NotificationTypeEnum.WARNING,
        message: i18n.t("mails:timezoneNotification.html", data),
        isHtml: true,
        jsonData: JSON.parse(i18n.t("mails:timezoneNotification.html", data)),
      },
      ctx!
    )

    return user
  }
)
