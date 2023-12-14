import { MailerOptions } from "./index"

export type AdminBlockUserMailer = {
  blockReason: string | null
}

export function adminBlockUserMailer(params: AdminBlockUserMailer, options?: MailerOptions) {
  const { blockReason } = params

  return {
    key: "adminBlockUser",
    data: {},
  }
}
