import { Routes } from "@blitzjs/next"
import { LocaleEnum } from "@prisma/client"
import { UserMailProps } from "types"

import { mailer } from "src/core/mailer/Mailer"
import createMockContext from "src/auth/components/CreateMockContext"
import { MailerOptions, mailSenderWithQueue } from "./index"

type ConfirmEmailAddressMailer = {
  user: UserMailProps
  token: string
}

export function confirmEmailLeelaCertMailer(
  params: ConfirmEmailAddressMailer,
  options?: MailerOptions
) {
  return mailSenderWithQueue("confirmEmailLeelaCertMailer", params, options || {}, async () => {
    const { user, token } = params
    const lang = user.locale || options?.lang || LocaleEnum.EN

    const origin = process.env.SITE_URL
    const siteName = process.env.SITE_NAME
    const path = process.env.SITE_URL || "" // Routes.AutoConfirmEmailLeelaCertPage().pathname
    const autoconfirmEmailUrl = `${origin}${path}?token=${token}`

    let mailParams = {
      token,
      siteName,
      autoconfirmEmailUrl,
    } as any

    const { ctx } = await createMockContext({ user })

    const message = await mailer.translate("confirmEmailLeelaCertMailer", mailParams, lang)

    return mailer.send({
      to: user.email,
      ...message,
    })
  })
}
