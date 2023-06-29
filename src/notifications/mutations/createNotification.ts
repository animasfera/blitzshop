import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateNotificationSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateNotificationSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const notification = await db.notification.create({ data: input })

    return notification
  }
)
