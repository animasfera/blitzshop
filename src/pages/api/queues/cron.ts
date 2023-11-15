import { api } from "src/blitz-server"
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next"
import * as Queues from "src/core/queues"

import { UserRole } from "@prisma/client"
import { AuthorizationError } from "blitz"
import { initCron } from "src/core/queues"

export default api(async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  let {
    query: { secret },
  } = req

  if (secret !== "1ee1a" && !ctx.session.$isAuthorized(UserRole.admin)) {
    throw new AuthorizationError()
  }

  Queues.initCron()

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ status: "OK" }))
})
