import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateChatRoomSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateChatRoomSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const chatRoom = await db.chatRoom.update({ where: { id }, data })

    return chatRoom
  }
)
