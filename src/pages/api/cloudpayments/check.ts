import { NextApiRequest, NextApiResponse } from "next"
import { api } from "src/blitz-server"
import { ResponseCodes } from "src/core/cloudpayments/ResponseCodes"
import blockInvoiceItems from "src/invoices/mutations/blockInvoiceItems"
import { UserRoleEnum } from "@prisma/client"

export default api(async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  let responseData = {} as any

  // 1. Check isAdmin
  if (!ctx.session.$isAuthorized(UserRoleEnum.ADMIN)) {
    console.error("req.headers.authorization", req.headers.authorization)

    res.statusCode = 401
    responseData.success = false
    responseData.message = "Unauthorized"
    res.end(JSON.stringify(responseData))
    return
  }

  // 2. Check if request method is POST
  if (req.method !== "POST") {
    res.statusCode = 400
    responseData.success = false
    responseData.message = "Данный API адрес может быть вызван только методом POST"
    res.end(JSON.stringify(responseData))
    return
  }
  res.setHeader("Content-Type", "application/json")

  const doPaymentOperation = {
    Refund: async (req: NextApiRequest, res: NextApiResponse, ctx) => {
      let { InvoiceId, TransactionId, Data } = req.body
      let success = true
      if (typeof Data !== "undefined") {
        Data = JSON.parse(Data)
      }
      return success
    },
    Payment: async (req: NextApiRequest, res: NextApiResponse, ctx) => {
      let { InvoiceId } = req.body
      const invoiceId = Number(InvoiceId)
      let success = true

      try {
        return await blockInvoiceItems({ invoiceId }, ctx)
      } catch (e) {
        console.error(e)
        success = false
      }
      return success
    },
  }

  let { OperationType } = req.body
  const responseSuccess = await doPaymentOperation[OperationType](req, res, ctx)
  responseData = responseSuccess ? { code: ResponseCodes.approve } : { code: ResponseCodes.reject }

  res.statusCode = 200
  res.end(JSON.stringify(responseData))
})
