import { Routes } from "@blitzjs/next"
import { MailerOptions } from "./index"

export type ConfirmEmailAddressMailer = {
  token: string
}

export function confirmEmailAddressMailer(
  params: ConfirmEmailAddressMailer,
  options?: MailerOptions
) {
  const { token } = params

  const origin = process.env.SITE_URL
  const siteName = process.env.SITE_NAME
  const path = Routes.AutoConfirmEmailPage().pathname
  const autoconfirmEmailUrl = `${origin}${path}?token=${token}`
  const path2 = Routes.ConfirmEmailPage().pathname
  const confirmEmailUrl = `${origin}${path2}`

  return {
    key: "confirmEmailAddress",
    data: {
      token,
      siteName,
      autoconfirmEmailUrl,
      confirmEmailUrl,
    },
  }
}
