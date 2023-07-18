import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateMailReceiverSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateMailReceiverSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const mailReceiver = await db.mailReceiver.update({ where: { id }, data })

    return mailReceiver
  }
)
