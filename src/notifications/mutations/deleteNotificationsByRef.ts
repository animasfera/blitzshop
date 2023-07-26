import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const DeleteNotificationsByRef = z.object({
  userId: z.number(),
  // ref: z.string(),
})

export default resolver.pipe(
  resolver.zod(DeleteNotificationsByRef),
  resolver.authorize(),
  async ({
    userId,
    // ref
  }) => {
    const notification = await db.notification.deleteMany({
      where: {
        userId,
        // ref
      },
    })

    return notification
  }
)
