import { LocaleEnum } from "@prisma/client"

export type NewNotificationParams = {
  type: string
  userIds: number[]
  data: { [key: string]: any }
}
export type CreateNotificationType = {
  key: string // Template name
  data: { [key: string]: any } // Template data
  [key: string]: any // For channel-specific data, e.g. buttons for telegram, channel name for Pusher, etc.
}
export type NotificationChannelType = "telegram" | "email" | "website" | "pusher"
export type CreateNotificationWithReceiver = {
  userId: number | number[]
  channels: NotificationChannelType[]
  data: CreateNotificationType
}

export type UserFiltered = { email?: string; telegramBotChatId?: number; id?: number }

export type ChannelsType = {
  email?: {
    subject: string
    body: string
    [key: string]: any
  }
  telegram?: {
    body: string
    [key: string]: any
  }
  website?: {
    body: string
    [key: string]: any
  }
  pusher?: {
    event: string
    channel: string
    data: string
  }
}

export type ChannelsByLocale = { locale: LocaleEnum; channels: ChannelsType }[]
