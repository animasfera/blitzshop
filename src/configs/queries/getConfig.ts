import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

import { formatConfig } from "src/core/helpers/formatConfig"

const GetConfig = z.object({
  // This accepts type of undefined, but is required at runtime
  key: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetConfig), async ({ key }) => {
  const config = await db.config.findFirst({ where: { key } })

  if (!config) throw new NotFoundError()

  return formatConfig(config)
})
