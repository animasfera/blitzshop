import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteMessageSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteMessageSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const message = await db.message.deleteMany({ where: { id } })

    return message
  }
)
