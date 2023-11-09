import axios from "axios"
import { CloudpaymentsCredentialsForPayouts } from "../../src/core/cloudpayments/CloudpaymentsCredentials"
import { BusinessEntity, MoneyAccount } from "@prisma/client"
import { handleCpApiResponse } from "../../src/core/cloudpayments/handleCpApiResponse"
import { handleCpApiError } from "../../src/core/cloudpayments/handleCpApiError"

type cpStartPayoutType = {
  invoiceId: number
  transactionId: number
  cardToken: string
  amount: number
  userId: number
  jsonData: any
  moneyAccount: MoneyAccount
  businessEntity: BusinessEntity
}

export const cpStartPayout = async ({
  invoiceId,
  transactionId,
  cardToken,
  amount,
  jsonData,
  userId,
  moneyAccount,
  businessEntity,
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
      moneyAccount: moneyAccount,
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
        moneyAccount: moneyAccount,
      },
      Payer:
        //Набор полей аналогичен и для параметра Receiver
        {
          FirstName: businessEntity.firstName,
          LastName: businessEntity.lastName,
          MiddleName: businessEntity.middleName,
          Address: businessEntity.address,
          Birth: "",
          City: "",
          Country: businessEntity.countryIsoCode,
          Phone: "",
          Postcode: "",
        },
    },
    {
      auth: CloudpaymentsCredentialsForPayouts,
    }
  )
}
