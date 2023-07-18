import axios from "axios"
import { CloudpaymentsCredentials } from "src/core/cloudpayments/CloudpaymentsCredentials"

type cpCreateRefundType = {
  transactionId: string
  amount: number
  jsonData: any
}

export const cpCreateRefund = async ({ transactionId, amount, jsonData }: cpCreateRefundType) => {
  console.log("Sending REFUND request to CloudPayments with input:")
  console.log({
    TransactionId: transactionId,
    Amount: amount,
    JsonData: jsonData,
  })

  return axios.post(
    "https://api.cloudpayments.ru/payments/refund",
    {
      TransactionId: transactionId,
      Amount: amount,
      JsonData: jsonData,
    },
    { auth: CloudpaymentsCredentials }
  )
}
