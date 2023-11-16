import { Routes } from "@blitzjs/next"
import { MailerOptions, mailSenderWithQueue } from "./index"

export type ResetPasswordMailer = {
  token: string
}

export function forgotPasswordMailer(params: ResetPasswordMailer, options?: MailerOptions) {
  const { token } = params
  const origin = process.env.SITE_URL
  const siteName = process.env.SITE_NAME
  const path = Routes.ResetPasswordPage().pathname
  const url = `${origin}${path}?token=${token}`
  return {
    key: "forgotPassword",
    data: {
      siteName,
      url,
    },
  }
}
