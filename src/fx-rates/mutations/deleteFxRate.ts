import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteFxRateSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteFxRateSchema),
  resolver.authorize(),
  async ({ from }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const fxRate = await db.fxRate.deleteMany({ where: { from } })

    return fxRate
  }
)
