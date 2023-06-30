import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteConfigSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteConfigSchema),
  resolver.authorize(),
  async ({ key }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const config = await db.config.deleteMany({ where: { key } })

    return config
  }
)
