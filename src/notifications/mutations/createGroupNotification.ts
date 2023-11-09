import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Prisma } from "@prisma/client"
import { CreateGroupNotificationSchema, CreateNotificationSchema } from "../validations"
import getNotifications from "../queries/getNotifications"

export default resolver.pipe(
  resolver.zod(CreateGroupNotificationSchema),
  // resolver.authorize(),
  async ({ userIds, ...rest }, ctx) => {
    let data = {
      ...rest,
      jsonData: rest.jsonData as Prisma.JsonObject,
    }

    // TODO use user locale

    const { notifications } = await getNotifications({ where: { ref: rest.ref } }, ctx)
    const notifiedUserIds = notifications.filter((n) => n.userId !== null).map((n) => n.userId!)
    const unnotifiedUids = userIds.filter((id) => notifiedUserIds.indexOf(id) === -1)

    let count = 0
    if (unnotifiedUids.length > 0) {
      const createData = unnotifiedUids.map((userId) => ({
        userId,
        ...data,
      }))

      const notificationsCreated = await db.notification.createMany({
        data: createData,
      })
      ;({ count } = notificationsCreated)
    }

    return {
      count,
      notifiedUserIds: unnotifiedUids,
    }
  }
)
