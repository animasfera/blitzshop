import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { NotFoundError } from "blitz"

const GetNotificationByUserRef = z.object({
  // This accepts type of undefined, but is required at runtime
  userId: z.number(),
  ref: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetNotificationByUserRef),
  resolver.authorize(),
  async ({ userId, ref }) => {
    const notification = await db.notification.findUnique({
      where: { userId_ref: { userId, ref } },
    })

    if (!notification) throw new NotFoundError()

    return notification
  }
)
