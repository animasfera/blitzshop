import { LocaleEnum, NotificationTypeEnum } from "@prisma/client"

import { mailer } from "src/core/mailer/Mailer"
import createMockContext from "src/auth/components/CreateMockContext"
import { MailerOptions, mailSenderWithQueue } from "./index"
import { UserMailProps } from "types"

type OrderProcessingMailer = {
  user: UserMailProps
  token: string
}

export function orderProcessingMailer(params: OrderProcessingMailer, options?: MailerOptions) {
  return mailSenderWithQueue("orderProcessingMailer", params, options || {}, async () => {
    const { user } = params
    const lang = user.locale || options?.lang || LocaleEnum.en

    let mailParams = {} as any

    const { ctx } = await createMockContext({ user })

    const message = await mailer.translate("orderProcessingMailer", mailParams, lang)

    return mailer.send({
      to: user.email,
      ...message,
    })
  })
}
