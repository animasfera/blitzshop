import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateChatRoomSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateChatRoomSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const chatRoom = await db.chatRoom.create({ data: input })

    return chatRoom
  }
)
