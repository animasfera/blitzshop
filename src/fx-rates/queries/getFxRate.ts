import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetFxRate = z.object({
  // This accepts type of undefined, but is required at runtime
  from: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetFxRate), resolver.authorize(), async ({ from }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const fxRate = await db.fxRate.findFirst({ where: { from } })

  if (!fxRate) throw new NotFoundError()

  return fxRate
})
