import {
  ChannelsByLocale,
  NewNotificationParams,
  CreateNotificationType,
  NotificationChannelType,
} from "./types"
import { TranslateMailerChannelsAllLangs } from "./TranslateChannels"

export const NotificationRenderByChannel = async (
  data: CreateNotificationType,
  channels: NotificationChannelType[]
): Promise<ChannelsByLocale> => {
  return await TranslateMailerChannelsAllLangs(data, channels)
}
