import { NextApiRequest, NextApiResponse } from "next"

import { api } from "src/blitz-server"
import failTransaction from "src/transactions/mutations/failTransaction"
import { ResponseCodes } from "src/core/cloudpayments/ResponseCodes"

export default api(async (req: NextApiRequest, res: NextApiResponse, сtx) => {
  let responseData = {} as any

  res.setHeader("Content-Type", "application/json")

  if (req.method !== "POST") {
    res.statusCode = 400
    responseData.success = false
    responseData.message = "Данный API адрес может быть вызван только методом POST"
    res.end(JSON.stringify(responseData))
  }
  res.statusCode = 200

  let { TransactionId, Amount, OperationType, InvoiceId, AccountId, Data, Reason, ReasonCode } =
    req.body
  const LocalTransactionId = Number(InvoiceId)
  ReasonCode = Number(ReasonCode)

  if (typeof Data !== "undefined") {
    Data = JSON.parse(Data)
  }

  if (
    typeof Data !== "undefined" &&
    Data.transactionType &&
    Data.transactionType === "attachCard"
  ) {
    responseData = { code: ResponseCodes.approve }
  } else {
    let transaction

    try {
      transaction = await failTransaction(
        {
          id: LocalTransactionId,
          failReason: Reason,
          failReasonCode: ReasonCode,
        },
        сtx
      )
    } catch (e) {
      console.error(e)
      res.statusCode = 500
    }

    responseData = transaction ? { code: ResponseCodes.approve } : { code: ResponseCodes.reject }
  }

  res.end(JSON.stringify(responseData))
})
