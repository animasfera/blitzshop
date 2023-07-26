import { NextApiRequest, NextApiResponse, NextApiHandler } from "next"
import { User } from "@prisma/client"
import db from "db"

import { api } from "src/blitz-server"
import finalizeTransactionService from "src/transactions/mutations/finalizeTransactionService"
import { ResponseCodes } from "src/core/cloudpayments/ResponseCodes"

export default api(async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  let responseData = {} as any

  console.log("starting API endpoint REFUND")
  res.setHeader("Content-Type", "application/json")

  if (req.method !== "POST") {
    res.statusCode = 400
    responseData.success = false
    responseData.message = "Данный API адрес может быть вызван только методом POST"
    res.end(JSON.stringify(responseData))
  }

  let { Data } = req.body
  if (typeof Data !== "undefined") {
    Data = JSON.parse(Data)
  }
  const { transactionId } = Data

  if (!transactionId) {
    console.log("Не указан transactionId")
    throw new Error("Не указан transactionId")
  }

  let success = true
  try {
    const user = (await db.user.findFirst({ where: { username: "omkar" } })) as User

    Object.assign(ctx.session.$publicData, {
      userId: user.id,
      id: user.id,
      role: user.role,
      isAdmin: true,
    })

    console.log("API endpoint REFUND will start finalizeTransactionService")
    //@ts-ignore
    await finalizeTransactionService({ id: transactionId }, ctx)
  } catch (e) {
    console.error(e)
    success = false
  }
  if (success) {
    res.statusCode = 200
    responseData = { code: ResponseCodes.approve }
  } else {
    res.statusCode = 400
    responseData = { code: ResponseCodes.reject }
  }

  res.end(JSON.stringify(responseData))
})
