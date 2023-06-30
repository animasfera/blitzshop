import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetConfig = z.object({
  // This accepts type of undefined, but is required at runtime
  key: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetConfig), resolver.authorize(), async ({ key }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const config = await db.config.findFirst({ where: { key } })

  if (!config) throw new NotFoundError()

  return config
})
