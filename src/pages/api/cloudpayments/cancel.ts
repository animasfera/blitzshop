import { NextApiRequest, NextApiResponse, NextApiHandler } from "next"

import { api } from "src/blitz-server"
import cancelTransaction from "src/transactions/mutations/cancelTransaction"

export default api(async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  let responseData = {} as any

  res.setHeader("Content-Type", "application/json")

  if (req.method !== "POST") {
    res.statusCode = 400
    responseData.success = false
    responseData.message = "Данный API адрес может быть вызван только методом POST"
    res.end(JSON.stringify(responseData))
  }

  let { TransactionId, Amount, OperationType, InvoiceId, AccountId, Data, Reason, ReasonCode } =
    req.body

  const LocalTransactionId = Number(InvoiceId)

  if (LocalTransactionId) {
    await cancelTransaction(
      {
        id: LocalTransactionId,
      },
      ctx
    )
  }

  responseData = { code: 0 }
  res.statusCode = 200
  res.end(JSON.stringify(responseData))
})
