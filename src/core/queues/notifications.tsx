import Queue from "bull"

import { GlobalRef } from "../index"
import { mailer } from "../mailer/Mailer"
import createNotification from "../../notifications/mutations/createNotification"
import { createAdminMockContext } from "../../auth/components/CreateMockContext"
import { NotificationTypeEnum } from "@prisma/client"
import { NotificationSend } from "../notifications/NotificationSend"
import { CreateNotificationWithReceiver } from "../notifications/types"
import { LocaleType } from "../../../types"
// import { TgButtonsType } from "../../../integrations/telegram/types"
import { getPusherServer } from "../pusher/server"
// import { tgBotApiEndpoints } from "../../../integrations/telegram/tgBotApiEndpoints"
// import { tgApiRequest } from "integrations/telegram/tgApiRequest"

const sendNotification = async (job: { data: CreateNotificationWithReceiver }) => {
  console.log("sendNotification")
  try {
    console.log("sendNotification")
    console.log(job.data)

    return await NotificationSend(job.data)
  } catch (e) {
    console.error(e)
  }
}

type EmailMessageType = {
  users: { email: string; [key: string]: any }
  subject: string
  body: string
  locale: LocaleType
}
const sendEmail = async (job: { data: EmailMessageType }) => {
  const { data } = job
  try {
    const mailData = {
      to: data.users.map((user) => user.email),
      subject: data.subject,
      html: data.body,
    }
    return mailer.send(mailData, data.locale)
  } catch (e) {
    console.error(e)
    return false
  }
}

// type TelegramMessageType = {
//   users: { telegramBotChatId: number; [key: string]: any }
//   body: string
//   buttons?: TgButtonsType[]
// }
// const sendTelegram = async (job: { data: TelegramMessageType }) => {
//   const { data } = job
//   try {
//     const chatIds = data.users.map((user) => user.telegramBotChatId)
//     return tgApiRequest(tgBotApiEndpoints.message.create, "POST", {
//       chatId: chatIds,
//       text: data.body,
//     })
//   } catch (e) {
//     console.error(e)
//     return false
//   }
// }

type WebsiteMessageType = {
  users: { id: number; [key: string]: any }
  body: string
}
const sendWebsite = async (job: { data: WebsiteMessageType }) => {
  const { data } = job
  const { users, ...rest } = data

  try {
    const adminCtx = await createAdminMockContext()
    users.forEach((user) => {
      let notificationData = {
        userId: user.id,
        type: NotificationTypeEnum.INFO,
        message: rest.body,
      }
      return createNotification(notificationData, adminCtx)
    })
  } catch (e) {
    console.error(e)
    return false
  }
}

type PusherMessageType = {
  event: string
  channel: string
  params: string
}
const sendPusher = async (job: { data: PusherMessageType }) => {
  const { data } = job
  const { event, channel, params } = data

  try {
    const pusher = getPusherServer()
    return await pusher.trigger(channel, event, params)
  } catch (e) {
    console.error(e)
    return false
  }
}

export const initNotificationsQueue = () => {
  console.log("init Notifications queue")

  const notificationsQ = new Queue("notifications")

  // void notificationsQ.process("telegram", sendTelegram)
  void notificationsQ.process("website", sendWebsite)
  void notificationsQ.process("send", sendNotification)
  void notificationsQ.process("email", sendEmail)
  void notificationsQ.process("pusher", sendPusher)

  return notificationsQ
}

let queueRef = new GlobalRef<Queue.Queue<any>>(`leela.queue.notifications`)
if (!queueRef.value) {
  queueRef.value = initNotificationsQueue()
}
export const NotificationsQueue = queueRef.value

export const initNotificationsCron = (): void => {
  console.log("initNotificationsCron")
}
