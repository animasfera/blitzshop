import { User, ShippingAddress } from "@prisma/client"
import axios from "axios"

import { CloudpaymentsCredentialsForPayouts } from "../core/cloudpayments/CloudpaymentsCredentials"

type cpStartPayoutType = {
  invoiceId: number
  transactionId: number
  cardToken: string
  amount: number
  userId: number
  jsonData: any
  user: User
  address: ShippingAddress
}

export const cpStartPayout = async ({
  invoiceId,
  transactionId,
  cardToken,
  amount,
  jsonData,
  user,
  userId,
  address,
}: cpStartPayoutType) => {
  console.log("Sending a PAYOUT request to CloudPayments with input:")
  console.log({
    InvoiceId: invoiceId,
    Token: cardToken,
    Amount: amount,
    AccountId: userId,
    Currency: "RUB",
    JsonData: {
      transactionId: transactionId,
      user,
    },
  })

  amount = Math.abs(amount)

  return axios.post(
    "https://api.cloudpayments.ru/payments/token/topup",
    {
      InvoiceId: invoiceId,
      Token: cardToken,
      Amount: amount,
      AccountId: userId,
      Currency: "RUB",
      JsonData: {
        transactionId: transactionId,
        user,
      },
      Payer:
        //Набор полей аналогичен и для параметра Receiver
        {
          FirstName: user.firstName,
          LastName: user.lastName,
          // MiddleName: user.,
          Address: address.address,
          Birth: "",
          City: address.city,
          Country: user.countryIsoCode,
          Phone: user.phone,
          Postcode: "",
        },
    },
    {
      auth: CloudpaymentsCredentialsForPayouts,
    }
  )
}
