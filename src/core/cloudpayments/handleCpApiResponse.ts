import { AxiosResponse } from "axios"
import { Ctx } from "blitz"
import failTransaction from "src/transactions/mutations/failTransaction"

export async function handleCpApiResponse(response: AxiosResponse<any>, transaction, ctx: Ctx) {
  console.log("Received response from cloudpayments API")
  console.log(response.data)
  if (response && response.data && response.data.Success === false) {
    console.error("Request to cloudpayments API: FAIL")
    const failReason = response.data.Message || ""
    const failReasonCode = response.data.Model?.ReasonCode || 0
    await failTransaction(
      { id: transaction.id, failReason: failReason, failReasonCode: failReasonCode },
      ctx
    )
  } else {
    console.log("Request to cloudpayments API: SUCCESS")
    const data = response.data
  }
}
