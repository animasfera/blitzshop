import Queue from "bull"

export type MailerOptions = {
  lang: string
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
      mailQ.add({
        mailer: methodName,
        params,
        options,
      })
    },
    send: sender,
  }
}
