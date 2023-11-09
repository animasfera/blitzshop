import db from "db"
import { NotificationFanOut } from "./NotificationsFanOut"
import { NotificationsChannel } from "@prisma/client"
import {
  NewNotificationParams,
  CreateNotificationType,
  UserFiltered,
  CreateNotificationWithReceiver,
} from "./types"
import { NotificationRenderByChannel } from "./NotificationRenderByChannel"

export const NotificationSend = async ({
  userId,
  channels,
  data,
}: CreateNotificationWithReceiver) => {
  const notificationsByChannel = await NotificationRenderByChannel(data, channels)
  let users = await db.user.findMany({
    where: {
      id: { in: userId },
      notificationsSettings: {
        some: { userEvents: true },
      },
    },
    select: {
      email: true,
      id: true,
      telegramBotChatId: true,
      locale: true,
      notificationsSettings: {
        where: {
          userEvents: true,
        },
      },
    },
  })
  let usersByLocale: { ru: UserFiltered[]; en: UserFiltered[] } = { ru: [], en: [] }
  users.forEach((user) => {
    let userFiltered: UserFiltered = {}
    if (user.notificationsSettings.find((ns) => ns.channel === NotificationsChannel.tgbot)) {
      if (user.telegramBotChatId !== null) {
        userFiltered.telegramBotChatId = user.telegramBotChatId
      }
    }
    if (user.notificationsSettings.find((ns) => ns.channel === NotificationsChannel.email)) {
      userFiltered.email = user.email
    }
    if (user.notificationsSettings.find((ns) => ns.channel === NotificationsChannel.web)) {
      userFiltered.id = user.id
    }
    if (!usersByLocale[user.locale]) {
      usersByLocale[user.locale] = []
    }
    usersByLocale[user.locale].push(userFiltered)
  })

  notificationsByChannel.forEach((localeNotifications) => {
    NotificationFanOut({
      ...localeNotifications,
      users: usersByLocale[localeNotifications.locale],
    })
  })
}
