import db, { LocaleEnum, MailStatusEnum } from "db"
import Queue from "bull"
import { renderToStaticMarkup } from "react-dom/server"

import { Body } from "db/zod/edotorjs"
import { mailer } from "src/core/mailer/Mailer"
import { renderEditorContent } from "src/core/components/editorjs/renderEditorContent"
import { GlobalRef } from "../index"

const sendMailsNewsletter = async () => {
  const mails = await db.mail.findMany({
    where: {
      status: { in: [MailStatusEnum.PENDING, MailStatusEnum.ERROR] },
      sendScheduledAt: { lte: new Date() },
    },

    include: { receiverType: true },
  })

  for (const mail of mails) {
    const bodyEn: Body = JSON.parse(JSON.stringify(mail.bodyEn))
    const bodyRu: Body = JSON.parse(JSON.stringify(mail.bodyRu))

    const htmlEn = bodyEn.blocks
      .map((block) => {
        return renderToStaticMarkup(
          renderEditorContent({
            typeContent: block.type,
            content: block.data,
          })
        )
      })
      .join("")

    const htmlRu = bodyRu.blocks
      .map((block) => {
        return renderToStaticMarkup(
          renderEditorContent({
            typeContent: block.type,
            content: block.data,
          })
        )
      })
      .join("")

    const users = await db.user.findMany({
      where: {
        // @ts-ignore
        ...mail.receiverType.query,
      },
      select: { email: true, id: true, locale: true },
    })

    const usersEn = users.filter(({ locale }) => locale === LocaleEnum.EN)
    const usersRu = users.filter(({ locale }) => locale === LocaleEnum.RU)

    if (!!usersEn) {
      try {
        await mailer.send({
          to: usersEn.map((user) => user.email),
          subject: mail.subjectEn,
          html: htmlEn,
        })

        await db.mail.updateMany({
          where: { id: { in: usersEn.map((user) => user.id) } },
          data: {
            status: MailStatusEnum.SENT,
            // @ts-ignore
            sentAt: new Date(),
            errorMessage: null,
          },
        })
      } catch (err) {
        console.error(err)

        await db.mail.updateMany({
          where: { id: { in: usersEn.map((user) => user.id) } },
          data: {
            errorMessage: "Ошибка при массовой рассылке",
            status: MailStatusEnum.ERROR,
          },
        })
      }
    }

    if (!!usersRu) {
      try {
        await mailer.send({
          to: usersRu.map((user) => user.email),
          subject: mail.subjectRu,
          html: htmlRu,
        })

        await db.mail.updateMany({
          where: { id: { in: usersRu.map((user) => user.id) } },
          data: {
            status: MailStatusEnum.SENT,
            // @ts-ignore
            sentAt: new Date(),
            errorMessage: null,
          },
        })
      } catch (err) {
        console.error(err)

        await db.mail.updateMany({
          where: { id: { in: usersRu.map((user) => user.id) } },
          data: {
            errorMessage: "Ошибка при массовой рассылке",
            status: MailStatusEnum.ERROR,
          },
        })
      }
    }
  }
}

export const initMailsNewsletterQueue = (): Queue.Queue<any> => {
  console.log("init mailsNewsletter Queue")

  const mailsNewsletterQueue = new Queue("mailsNewsletter")

  void mailsNewsletterQueue.process("sendMailsNewsletter", sendMailsNewsletter)

  return mailsNewsletterQueue
}

let queueRef = new GlobalRef<Queue.Queue<any>>(`leela.queue.mailsNewsletter`)
if (!queueRef.value) {
  queueRef.value = initMailsNewsletterQueue()
}
export const MailsNewsletterQueue = queueRef.value

export const initMailsNewsletterCron = (): void => {
  console.log("initMailsNewsletterCron")

  void MailsNewsletterQueue.add("sendMailsNewsletter", {}, { repeat: { cron: "0 * * * *" } })
}
