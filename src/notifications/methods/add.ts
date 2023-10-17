import { CreateNotificationWithReceiver } from "../../core/notifications/types"
import axios from "axios"

export const notification = async (
  notification: CreateNotificationWithReceiver | CreateNotificationWithReceiver[]
) => {
  return axios
    .post(process.env.SITE_URL + "/api/queues/add", { notification: notification })
    .then((data) => {})
}
