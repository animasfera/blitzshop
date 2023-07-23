import { Ctx } from "blitz"
import { getSession } from "@blitzjs/auth"
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next"
import db from "db"
import { User } from "@prisma/client"

import { api } from "src/blitz-server"
import upsertCardToken from "src/card-tokens/mutations/createCloudpaymentsCardToken"
import { ResponseCodes } from "src/core/cloudpayments/ResponseCodes"
import finalizeTransactionService from "src/transactions/mutations/finalizeTransactionService"

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
    CardPayout: async (req: NextApiRequest, res: NextApiResponse, ctx: Ctx) => {
      let { Data } = req.body
      let success = true

      if (typeof Data !== "undefined") {
        Data = JSON.parse(Data)
      }
      const transactionId = Number(Data.transactionId)

      const user = (await db.user.findFirst({ where: { username: "omkar" } })) as User

      Object.assign(ctx.session.$publicData, {
        userId: user.id,
        id: user.id,
        role: user.role,
        isAdmin: true,
      })

      try {
        await finalizeTransactionService({ id: transactionId }, ctx)
      } catch (e) {
        console.error(e)
        success = false
      }
      return success
    },
    Payment: async (req: NextApiRequest, res: NextApiResponse, ctx: Ctx) => {
      let { Data } = req.body
      let success = true

      if (typeof Data !== "undefined") {
        Data = JSON.parse(Data)
      }

      if (
        typeof Data !== "undefined" &&
        Data.transactionType &&
        Data.transactionType === "attachCard"
      ) {
        let { Token, CardLastFour, CardType, CardExpDate, TotalFee, IssuerBankCountry, AccountId } =
          req.body
        TotalFee = Number(TotalFee)
        AccountId = Number(AccountId)

        try {
          /*
          await upsertCardToken(
            {
              token: Token,
              cardLastFour: CardLastFour,
              cardType: CardType,
              cardExpDate: CardExpDate,
              feeCardTransactionCoef: Number(((TotalFee * 100) / 1).toFixed(2)),
              cardCountryIsoCode: IssuerBankCountry || "",
              ownerId: AccountId,
            },
            ctx
          )
          */
        } catch (e) {
          success = false
        }
        return success
      } else {
        let { InvoiceId, TransactionId, TotalFee, Amount } = req.body
        let success = true
        const LocalTransactionId = Number(InvoiceId)
        TransactionId = String(TransactionId)

        try {
          const user = (await db.user.findFirst({ where: { username: "omkar" } })) as User
          Object.assign(ctx.session.$publicData, {
            userId: user.id,
            id: user.id,
            role: user.role,
            isAdmin: true,
          })

          await finalizeTransactionService(
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
