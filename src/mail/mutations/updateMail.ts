import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateMailSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateMailSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const mail = await db.mail.update({ where: { id }, data })

    return mail
  }
)
