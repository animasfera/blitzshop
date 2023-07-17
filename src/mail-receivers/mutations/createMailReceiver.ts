import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateMailReceiverSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateMailReceiverSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const mailReceiver = await db.mailReceiver.create({ data: input })

    return mailReceiver
  }
)
