import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const ViewNotification = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(ViewNotification),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const notification = await db.notification.updateMany({
      where: { id, userId: ctx.session.userId },
      data: { viewed: true },
    })

    return notification
  }
)
