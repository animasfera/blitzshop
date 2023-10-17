import { NotificationModel } from "db/zod"
import { z } from "zod"

export const CreateNotificationSchema = NotificationModel.pick({
  userId: true,
  title: true,
  message: true,
  type: true,
  jsonData: true,
  ref: true,
  viewed: true,
}).partial({
  jsonData: true,
  viewed: true,
})

export const CreateGroupNotificationSchema = NotificationModel.pick({
  title: true,
  message: true,
  type: true,
  jsonData: true,
  ref: true,
  viewed: true,
})
  .partial({
    jsonData: true,
    viewed: true,
  })
  .merge(
    z.object({
      userIds: z.array(z.number()),
    })
  )

export const UpdateNotificationSchema = NotificationModel.pick({
  id: true,
  viewed: true,
})

export type CreateNotificationType = z.infer<typeof CreateNotificationSchema>
