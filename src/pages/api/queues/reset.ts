import { AuthorizationError } from "blitz"
import { getSession } from "@blitzjs/auth"
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next"
import { UserRoleEnum } from "@prisma/client"

import { api } from "src/blitz-server"
import * as Queues from "src/core/queues"

export default api(async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  const session = await getSession(req, res)

  if (!session.$isAuthorized(UserRoleEnum.ADMIN)) {
    throw new AuthorizationError()
  }

  await Queues.MailsQueue.obliterate({ force: true })
  await Queues.InvoicesQueue.obliterate({ force: true })
  await Queues.ImagesQueue.obliterate({ force: true })
  // await Queues.SlotsQueue.obliterate({ force: true })
  // await Queues.ReportsQueue.obliterate({ force: true })
  // await Queues.TransactionsQueue.obliterate({ force: true })
  await Queues.MailsNewsletterQueue.obliterate({ force: true })

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({}))
})
