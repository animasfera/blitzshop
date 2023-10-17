import i18n from "../i18n"
import {
  ChannelsByLocale,
  ChannelsType,
  CreateNotificationType,
  NotificationChannelType,
} from "./types"
import { br2nl } from "../helpers/Helpers"
import { LocaleEnum } from "@prisma/client"

export const TranslateMailerChannelsAllLangs = async (
  data: CreateNotificationType,
  channels: NotificationChannelType[]
): Promise<ChannelsByLocale> => {
  let channelsByLocale: ChannelsByLocale = []
  for (let lang of ["en", "ru"]) {
    channelsByLocale.push({
      locale: lang as LocaleEnum,
      channels: await TranslateMailerChannelsByLang(lang as LocaleEnum, data, channels),
    })
  }
  return channelsByLocale
}

export const TranslateMailerChannelsByLang = async (
  lang: LocaleEnum,
  data: CreateNotificationType,
  channels: NotificationChannelType[]
): Promise<ChannelsType> => {
  await i18n.changeLanguage(lang)
  await i18n.loadNamespaces(["mails"])

  let res: ChannelsType = {}
  // if (i18n.exists(`mails:${mailer}.email.body`)) {
  if (channels.indexOf("email") !== -1) {
    res.email = {
      subject: i18n.t(`mails:${data.key}.email.subject`, data.data) as string,
      body: i18n.t(`mails:${data.key}.email.body`, data.data) as string,
    }
    // Add metadata
    if (data.email) {
      Object.assign(res, data.telegram)
    }
  }
  // if (i18n.exists(`mails:${mailer}.telegram.body`)) {
  if (channels.indexOf("telegram") !== -1) {
    let mailerKey = i18n.exists(`mails:${data.key}.telegram.body`)
      ? `mails:${data.key}.telegram.body`
      : `mails:${data.key}.email.body`
    let str = i18n.t(mailerKey, data.data) as string
    let body = br2nl(str)
    res.telegram = {
      body,
    }
    // Add metadata
    if (data.telegram) {
      Object.assign(res, data.telegram)
    }
  }

  if (channels.indexOf("website") !== -1) {
    res.website = {
      body: i18n.t(`mails:${data.key}.email.body`, data.data) as string,
    }
    // Add metadata
    if (data.website) {
      Object.assign(res, data.website)
    }
  }

  if (channels.indexOf("pusher") !== -1) {
    // Add metadata
    if (data.pusher) {
      res.pusher = data.pusher
    }
  }
  return res
}
