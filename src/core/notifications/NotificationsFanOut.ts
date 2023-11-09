// import { NotificationsQueue } from "../queues"
import { ChannelsType, UserFiltered } from "./types"
// import { LocaleType } from "../../../types"

const channelToField = {
  telegram: "telegramBotChatId",
  email: "email",
  website: "id",
}

export const NotificationFanOut = (data: {
  // locale: LocaleType
  // users: UserFiltered[]
  // channels: ChannelsType
}) => {
  try {
    /*
    // get data for all channels
    // send data to each queue by channel
    for (var channelType in data.channels) {
      const users = data.users.filter((u) => typeof u[channelToField[channelType]] !== "undefined")
      if (users.length > 0) {
        let channelData: {
          users: UserFiltered[]
          subject?: string
          body: string
          locale: LocaleType
        } = {
          ...data.channels[channelType],
          locale: data.locale,
          users,
        }
        // channelData = channelType
        void NotificationsQueue.add(channelType, channelData)
      }
    }
  } catch (e) {
    console.error(e)
  }

     */
  } catch (e) {}
}
