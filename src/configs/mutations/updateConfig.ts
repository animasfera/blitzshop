import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateConfigSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateConfigSchema),
  resolver.authorize(),
  async ({ key, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const config = await db.config.update({ where: { key }, data })

    return config
  }
)
