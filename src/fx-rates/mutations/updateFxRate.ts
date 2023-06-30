import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateFxRateSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateFxRateSchema),
  resolver.authorize(),
  async ({ from, to }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const fxRate = await db.fxRate.update({
      where: { from_to: { from, to } },
      data: {},
    })

    return fxRate
  }
)
