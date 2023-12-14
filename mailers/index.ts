import * as mailers from "./merge"
export * from "./merge"
import Queue from "bull"

export type MailerOptions = {
  locale?: string
  timezone?: string
}

export const mailSenderWithQueue = (
  methodName: string,
  params: { [key: string]: any },
  options: { lang?: string },
  sender: () => Promise<void>
) => {
  return {
    queue: () => {
      const mailQ = new Queue("mails")
      mailQ.add("sendMail", {
        mailer: methodName,
        params,
        options,
      })
    },
    send: sender,
  }
}
