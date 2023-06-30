import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateConfigSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateConfigSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const config = await db.config.create({ data: input })

    return config
  }
)
