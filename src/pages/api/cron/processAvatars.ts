import { api } from "src/blitz-server"
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next"
import processAvatars from "src/users/mutations/processAvatars"
import { UserRoleEnum } from "@prisma/client"
import { AuthorizationError, NotFoundError } from "blitz"

export default api(async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  if (!ctx.session.$isAuthorized(UserRoleEnum.ADMIN)) {
    throw new AuthorizationError()
  }
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  const {
    query: { pid },
  } = req

  await processAvatars({}, ctx)
  res.end(JSON.stringify({}))
})
