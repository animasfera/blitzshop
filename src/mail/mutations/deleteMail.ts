import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteMailSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteMailSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const mail = await db.mail.deleteMany({ where: { id } })

    return mail
  }
)
