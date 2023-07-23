import { NextApiRequest, NextApiResponse } from "next"
import { api } from "src/blitz-server"
import initTransaction from "src/transactions/mutations/initTransaction"
import { ResponseCodes } from "src/core/cloudpayments/ResponseCodes"

export default api(async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  let responseData = {} as any

  console.log("STARTING /check")

  // 1. Check if request method is POST
  if (req.method !== "POST") {
    res.statusCode = 400
    responseData.success = false
    responseData.message = "Данный API адрес может быть вызван только методом POST"
    res.end(JSON.stringify(responseData))
    return
  }
  res.setHeader("Content-Type", "application/json")

  const doPaymentOperation = {
    CardPayout: async (req: NextApiRequest, res: NextApiResponse, ctx) => {
      let { InvoiceId, TransactionId, Data } = req.body
      let success = true

      if (typeof Data !== "undefined") {
        Data = JSON.parse(Data)
      }
      const LocalTransactionId = Number(InvoiceId)
      TransactionId = String(TransactionId)

      try {
        await initTransaction({ id: LocalTransactionId, remoteTransactionId: TransactionId }, ctx)
      } catch (e) {
        console.error(e)
        success = false
      }
      return success
    },
    Refund: async (req: NextApiRequest, res: NextApiResponse, ctx) => {
      let { InvoiceId, TransactionId, Data } = req.body
      let success = true
      if (typeof Data !== "undefined") {
        Data = JSON.parse(Data)
      }
      const LocalTransactionId = Number(InvoiceId)
      TransactionId = String(TransactionId)

      try {
        await initTransaction({ id: LocalTransactionId, remoteTransactionId: TransactionId }, ctx)
      } catch (e) {
        console.error(e)
        success = false
      }
      return success
    },
    Payment: async (req: NextApiRequest, res: NextApiResponse, ctx) => {
      let { TransactionId, InvoiceId, Data } = req.body
      const LocalTransactionId = Number(InvoiceId)
      TransactionId = String(TransactionId)
      let success = true

      if (typeof Data !== "undefined") {
        Data = JSON.parse(Data)
      }

      if (
        typeof Data !== "undefined" &&
        Data.transactionType &&
        Data.transactionType === "attachCard"
      ) {
        return true
      } else {
        try {
          return await initTransaction(
            { id: LocalTransactionId, remoteTransactionId: TransactionId },
            ctx
          )
        } catch (e) {
          console.error(e)
          success = false
        }
        return success
      }
    },
  }

  let { OperationType } = req.body
  const responseSuccess = await doPaymentOperation[OperationType](req, res, ctx)
  responseData = responseSuccess ? { code: ResponseCodes.approve } : { code: ResponseCodes.reject }

  res.statusCode = 200
  res.end(JSON.stringify(responseData))
})
