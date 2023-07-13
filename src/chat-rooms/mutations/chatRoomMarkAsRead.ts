import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { DateTime } from "luxon"

const MarkAsRead = z.object({
  id: z.number(),
  lastMessageTimestamp: z.number(),
})

export default resolver.pipe(
  resolver.zod(MarkAsRead),
  resolver.authorize(),
  async ({ id, lastMessageTimestamp }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    const chatRoomToUser = await db.userToChatRoom.findUnique({
      where: { userId_roomId: { roomId: id, userId: ctx.session.userId } },
      include: { lastReadMessage: true },
    })
    let numRead: number
    if (chatRoomToUser?.lastReadMessage) {
      numRead = await db.message.count({
        where: {
          createdAt: {
            gt: chatRoomToUser.lastReadMessage.createdAt,
            lte: DateTime.fromMillis(lastMessageTimestamp).toJSDate(),
          },
        },
      })
    } else {
      numRead = chatRoomToUser?.numUnread || 0
    }

    const chatRoomToUser2 = await db.userToChatRoom.update({
      where: { userId_roomId: { roomId: id, userId: ctx.session.userId } },
      data: { numUnread: { decrement: numRead } },
    })

    return chatRoomToUser2
  }
)
