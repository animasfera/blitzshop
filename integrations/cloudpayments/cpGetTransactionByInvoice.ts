import axios from "axios"
import {
  CloudpaymentsCredentials,
  CloudpaymentsCredentialsForPayouts,
} from "../../src/core/cloudpayments/CloudpaymentsCredentials"

export const cpGetTransactionByLocalTransactionId = async ({ id }: { id: string | number }) => {
  console.log("Sending request to CloudPayments to check Invoice status")
  console.log({
    InvoiceId: id,
  })
  id = id + ""
  return axios.post(
    "https://api.cloudpayments.ru/v2/payments/find",
    {
      InvoiceId: id,
    },
    { auth: CloudpaymentsCredentials }
  )
}
