import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateMessageSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateMessageSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const message = await db.message.update({ where: { id }, data })

    return message
  }
)
