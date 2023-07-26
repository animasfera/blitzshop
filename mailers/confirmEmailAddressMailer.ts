import { LocaleEnum, NotificationTypeEnum } from "@prisma/client"

import { mailer } from "src/core/mailer/Mailer"
import createNotification from "src/notifications/mutations/createNotification"
import createMockContext from "src/auth/components/CreateMockContext"
import { MailerOptions, mailSenderWithQueue } from "./index"
import { UserMailProps } from "types"

type ConfirmEmailAddressMailer = {
  user: UserMailProps
  token: string
}

export function confirmEmailAddressMailer(
  params: ConfirmEmailAddressMailer,
  options?: MailerOptions
) {
  return mailSenderWithQueue("confirmEmailAddressMailer", params, options || {}, async () => {
    const { user, token } = params
    const lang = user.locale || options?.lang || LocaleEnum.EN

    const origin = process.env.SITE_URL || ""
    const siteName = process.env.SITE_NAME || ""
    const path = process.env.SITE_URL || "" // Routes.AutoConfirmEmailPage().pathname
    const autoconfirmEmailUrl = `${origin}${path}?token=${token}`
    const path2 = process.env.SITE_URL || "" // Routes.ConfirmEmailPage().pathname
    const confirmEmailUrl = `${origin}${path2}`

    let mailParams = {
      token,
      siteName,
      autoconfirmEmailUrl,
      confirmEmailUrl,
    } as any

    const { ctx } = await createMockContext({ user })

    await createNotification(
      {
        userId: user.id,
        type: NotificationTypeEnum.WARNING,
        message: `Для завершения регистрации, пожалуйста, <a href="${confirmEmailUrl}">подтвердите ваш e-mail</a>.`,
        isHtml: true,
        jsonData: JSON.parse(
          `Для завершения регистрации, пожалуйста, <a href="${confirmEmailUrl}">подтвердите ваш e-mail</a>.`
        ),
      },
      ctx
    )

    const message = await mailer.translate("confirmEmailAddressMailer", mailParams, lang)

    return mailer.send({
      to: user.email,
      ...message,
    })
  })
}
