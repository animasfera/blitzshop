import { api } from "src/blitz-server"
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next"
import { getSession } from "@blitzjs/auth"
import * as Queues from "src/core/queues"
import { UserRoleEnum } from "@prisma/client"
import { AuthorizationError } from "blitz"

export default api(async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  const session = await getSession(req, res)

  if (!session.$isAuthorized(UserRoleEnum.ADMIN)) {
    throw new AuthorizationError()
  }

  await Queues.MailsQueue.obliterate({ force: true })
  // await Queues.InvoicesQueue.obliterate({ force: true })
  await Queues.ImagesQueue.obliterate({ force: true })
  // await Queues.SlotsQueue.obliterate({ force: true })
  // await Queues.ReportsQueue.obliterate({ force: true })
  // await Queues.TransactionsQueue.obliterate({ force: true })

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({}))
})
