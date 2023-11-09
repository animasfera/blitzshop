import { CreateNotificationWithReceiver } from "./types"
import { notification } from "../../notifications/methods/add"
export type NotificationsTransactionType = {
  queue: CreateNotificationWithReceiver[]
  add: (params: CreateNotificationWithReceiver) => void
  commit: () => void
  send: (params: CreateNotificationWithReceiver) => void
  reset: () => void
}

export const startNotificationsTransaction = (): NotificationsTransactionType => {
  let notifications: CreateNotificationWithReceiver[] = []

  return {
    queue: notifications,
    send: notification,
    add: (data) => {
      notifications.push(data)
    },
    commit: async () => {
      console.log("Commit transactions")
      const res = await notification(notifications)
      notifications = []
      return res
    },
    reset: () => {
      notifications = []
    },
  }
}
