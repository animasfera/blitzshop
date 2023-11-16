import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Prisma } from "@prisma/client"
import { CreateNotificationSchema } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateNotificationSchema),
  // resolver.authorize(),
  async (input, ctx) => {
    let data = {
      ...input,
      jsonData: input.jsonData as Prisma.JsonObject,
    }

    const notification = await db.notification.upsert({
      where: { userId_ref: { userId: input.userId || 0, ref: input.ref || "" } },
      create: { ...data },
      update: { viewed: false },
    })

    return notification
  }
)
