import { Avatar, Box, Flex } from "@chakra-ui/react"
import React from "react"
import // PaymentMethodType,
// PaymentType,
// Prisma,
// PaymentMethodDetail as PaymentMethodDetailDbType,
"@prisma/client"
import { CardTokenListItem } from "src/card-tokens/components/CardTokenListItem"
// import { BankProfile } from "src/bank-profiles/components/BankProfile"

type PaymentMethodDetailProps = {
  paymentMethodDetail: any // & PaymentMethodDetailDbType
}

export const PaymentMethodDetail = (props: PaymentMethodDetailProps) => {
  const { paymentMethodDetail } = props

  const pmTypes = {
    card: CardTokenListItem,
    // bank: BankProfile,
  }

  if (!paymentMethodDetail.paymentMethod.type) {
    return <></>
  }

  const CertainPaymentDetail = pmTypes[paymentMethodDetail.paymentMethod.type]

  const data = paymentMethodDetail
  /*
    paymentMethodDetail.paymentMethod.type === PaymentMethodType.bank
      ? {
          bankProfile: paymentMethodDetail.bankProfile,
        }
      : {
          cardToken: paymentMethodDetail.cardToken,
        }
        */

  return (
    <Box>
      <CertainPaymentDetail {...data} />
    </Box>
  )
}
