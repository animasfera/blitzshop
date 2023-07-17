import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateMailSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateMailSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const mail = await db.mail.create({ data: input })

    return mail
  }
)
