import * as mailers from "mailers/merge"
import Queue from "bull"

// import { sendMailsNewsletter } from "mailers/newsletterMailer"
import { GlobalRef } from "../index"

type SendMailParams = {
  data: {
    mailer: string
    params: { [key: string]: any }
    options?: {
      lang?: string
    }
  }
}

const sendMail = async (job: SendMailParams) => {
  const { mailer, params, options } = job.data
  try {
    if (mailers[mailer]) {
      await mailers[mailer](params, options).send()
    } else {
      throw new Error("Mailer " + +" not found.")
    }
  } catch (e) {
    console.error(e)
  }
}

export const initMailsQueue = () => {
  console.log("init Mails queue")

  const mailsQ = new Queue("mails")
  void mailsQ.process("sendMail", sendMail)
  // void mailsQ.process("sendMailsNewsletter", sendMailsNewsletter)

  return mailsQ
}

let queueRef = new GlobalRef<Queue.Queue<any>>(`omkarashop.queue.mails`)
if (!queueRef.value) {
  queueRef.value = initMailsQueue()
}
export const MailsQueue = queueRef.value

export const initMailsCron = (): void => {
  console.log("initMailsNewsletterCron")

  void MailsQueue.add("sendMailsNewsletter", {}, { repeat: { cron: "* * * * *" } })
}
