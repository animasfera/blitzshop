import { NextApiRequest, NextApiResponse } from "next"
import { api } from "src/blitz-server"

import { ResponseCodes } from "src/core/cloudpayments/ResponseCodes"
import releaseInvoiceItems from "src/invoices/mutations/releaseInvoiceItems"

export default api(async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  let responseData = {} as any

  res.setHeader("Content-Type", "application/json")

  if (req.method !== "POST") {
    res.statusCode = 400
    responseData.success = false
    responseData.message = "Данный API адрес может быть вызван только методом POST"
    res.end(JSON.stringify(responseData))
  }
  res.statusCode = 200

  let { InvoiceId } = req.body

  let result = false
  const invoiceId = Number(InvoiceId)

  if (invoiceId) {
    let { InvoiceId } = req.body
    const invoiceId = Number(InvoiceId)

    try {
      result = await releaseInvoiceItems({ invoiceId }, ctx)
    } catch (e) {
      console.error(e)
    }
  }

  responseData = result ? { code: ResponseCodes.approve } : { code: ResponseCodes.reject }

  res.end(JSON.stringify(responseData))
})
