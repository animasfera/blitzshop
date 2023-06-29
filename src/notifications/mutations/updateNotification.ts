import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateNotificationSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateNotificationSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const notification = await db.notification.update({ where: { id }, data })

    return notification
  }
)
