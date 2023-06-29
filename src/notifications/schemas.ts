import { z } from "zod"
import { NotificationModel } from "db/zod"

export const CreateNotificationSchema = NotificationModel.pick({
  title: true,
  message: true,
  isHtml: true,
  jsonData: true,
  type: true,
  res: true,
  userId: true,
})

export const UpdateNotificationSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteNotificationSchema = z.object({
  id: z.number(),
})
