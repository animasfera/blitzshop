import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateFxRateSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateFxRateSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const fxRate = await db.fxRate.create({ data: input })

    return fxRate
  }
)
