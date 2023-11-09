import { Ctx } from "blitz"
import { NextApiRequest, NextApiResponse } from "next"
import db from "db"
import { TransactionStatusEnum, TransactionTypeEnum, User, UserRoleEnum } from "@prisma/client"
import { api } from "src/blitz-server"
import { ResponseCodes } from "src/core/cloudpayments/ResponseCodes"
import createTransactionService from "src/transactions/mutations/createTransactionService"

export default api(async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  let responseData = {} as any

  res.setHeader("Content-Type", "application/json")

  if (req.method !== "POST") {
    res.statusCode = 400
    responseData.success = false
    responseData.message = "Данный API адрес может быть вызван только методом POST"
    res.end(JSON.stringify(responseData))
  }

  const doPaymentOperation = {
    Payment: async (req: NextApiRequest, res: NextApiResponse, ctx: Ctx) => {
      let { Data } = req.body
      let success = true

      if (typeof Data !== "undefined") {
        Data = JSON.parse(Data)
      }

      let { InvoiceId, TransactionId, TotalFee, Amount } = req.body
      const amount = Number(Amount)
      const invoiceId = Number(InvoiceId)
      const remoteTransactionId = String(TransactionId)

      try {
        const user = (await db.user.findFirst({ where: { role: UserRoleEnum.ADMIN } })) as User
        Object.assign(ctx.session.$publicData, {
          userId: user.id,
          id: user.id,
          role: user.role,
          isAdmin: true,
        })

        await createTransactionService(
          {
            invoiceId,
            remoteTransactionId,
            amount,
            status: TransactionStatusEnum.FINISHED,
            type: TransactionTypeEnum.SALE,
          },
          ctx
        )
      } catch (e) {
        console.error(e)
        success = false
      }
      return success
    },
  }

  try {
    const { OperationType } = req.body
    console.log("/pay - OperationType: " + OperationType)
    const responseSuccess = await doPaymentOperation[OperationType](req, res, ctx)
    responseData = responseSuccess
      ? { code: ResponseCodes.approve }
      : { code: ResponseCodes.reject }
  } catch (e) {
    console.error(e)
    responseData = { code: ResponseCodes.reject }
  }

  res.statusCode = 200
  res.end(JSON.stringify(responseData))
})
