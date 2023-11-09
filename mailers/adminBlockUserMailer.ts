import { Location, LocaleEnum, User } from "@prisma/client"

import { mailer } from "src/core/mailer/Mailer"
import createMockContext from "src/auth/components/CreateMockContext"
import { MailerOptions, mailSenderWithQueue } from "./index"

type AdminBlockUserMailer = {
  user: User & {
    location: Location | null
  }
}

export function adminBlockUserMailer(params: AdminBlockUserMailer, options?: MailerOptions) {
  return mailSenderWithQueue("adminBlockUserMailer", params, options || {}, async () => {
    const { user } = params
    const lang = user.locale || options?.lang || LocaleEnum.en

    const origin = process.env.SITE_URL
    const siteName = process.env.SITE_NAME
    const path = process.env.SITE_URL || "" // Routes.AutoConfirmEmailLeelaCertPage().pathname

    let mailParams = {
      // blockReason,
      siteName,
      // confirmEmailUrl,
    } as any

    const { ctx } = await createMockContext({ user })

    const message = await mailer.translate("adminBlockUserMailer", mailParams, lang)

    return mailer.send({
      to: user.email,
      ...message,
    })
  })
}
