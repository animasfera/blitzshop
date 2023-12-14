import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const DeleteNotification = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteNotification),
  resolver.authorize(),
  async ({ id }) => {
    const notification = await db.notification.deleteMany({ where: { id } })

    return notification
  }
)
