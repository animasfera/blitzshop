import { api } from "src/blitz-server"
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next"
import { NotificationsQueue } from "src/core/queues"
import { CreateNotificationWithReceiver } from "../../../core/notifications/types"

export default api(async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  let data = req.body
  let notification: CreateNotificationWithReceiver | CreateNotificationWithReceiver[] =
    data.notification

  if (!Array.isArray(notification)) {
    notification = [notification]
  }
  for (var singleNotification of notification) {
    const job = await NotificationsQueue.add("send", singleNotification)
  }

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ status: "OK" }))
})
