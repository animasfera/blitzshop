import { NextApiRequest, NextApiResponse, NextApiHandler } from "next"

import { api } from "src/blitz-server"
import { syncHangingTransactionsCronJob } from "src/core/queues/transactions"

export default api(async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  let responseData = {} as any

  console.log("STARTING /check")

  // 1. Check if request method is POST
  res.setHeader("Content-Type", "application/json")

  await syncHangingTransactionsCronJob()

  res.statusCode = 200
  res.end(JSON.stringify(responseData))
})
