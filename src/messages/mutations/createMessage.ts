import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateMessageSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateMessageSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const message = await db.message.create({ data: input })

    return message
  }
)
