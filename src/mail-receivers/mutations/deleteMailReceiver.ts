import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteMailReceiverSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteMailReceiverSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const mailReceiver = await db.mailReceiver.deleteMany({ where: { id } })

    return mailReceiver
  }
)
