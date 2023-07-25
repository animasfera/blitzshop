import { AuthorizationError } from "blitz"
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next"
import { UserRoleEnum } from "@prisma/client"

import { api } from "src/blitz-server"
import * as Queues from "src/core/queues"

export default api(async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  let {
    query: { secret },
  } = req

  if (secret !== "1ee1a" && !ctx.session.$isAuthorized(UserRoleEnum.ADMIN)) {
    throw new AuthorizationError()
  }

  Queues.init()

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ status: "OK" }))
})
