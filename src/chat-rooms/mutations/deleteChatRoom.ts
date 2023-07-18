import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteChatRoomSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteChatRoomSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const chatRoom = await db.chatRoom.deleteMany({ where: { id } })

    return chatRoom
  }
)
