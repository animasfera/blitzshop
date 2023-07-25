import { invalidateQuery, useMutation, useQuery } from "@blitzjs/rpc"
import { Box, Grid, GridItem } from "@chakra-ui/react"
import { TransactionStatusEnum, TransactionTypeEnum } from "@prisma/client"

import { DateWithTime } from "src/core/components/Date"
import { Money } from "src/core/components/Money"
import getTransaction from "../queries/getTransaction"
import { PaymentMethodDetail } from "src/payment-method-details/components/PaymentMethodDetail"
import { TransactionStatusRu } from "./TransactionEnums"
import updateTransaction from "../mutations/updateTransaction"
import { TransactionStatusField } from "./TransactionStatusField"

type TransactionControllerProps = {
  id: number
}

export const TransactionController = (props: TransactionControllerProps) => {
  const { id } = props
  const [transaction] = useQuery(getTransaction, { id })
  const [updateTransactionMutation] = useMutation(updateTransaction)

  return (
    <>
      <Grid templateColumns="1fr 3fr" gap={4}>
        <GridItem fontWeight={"bold"}>ID</GridItem>
        <GridItem>{transaction.id}</GridItem>
        <GridItem fontWeight={"bold"}>Статус</GridItem>
        <GridItem>
          <Box maxW={"300px"}>
            <TransactionStatusField
              status={transaction.status}
              statusList={TransactionStatusRu}
              onChange={async (values: {
                status: TransactionStatusEnum
                failReason?: string
                remoteTransactionId?: string
              }) => {
                // @ts-ignore
                await updateTransactionMutation({ id: transaction.id, ...values })
                invalidateQuery(getTransaction)
              }}
            />
          </Box>
        </GridItem>
        <GridItem fontWeight={"bold"}>Операция</GridItem>
        <GridItem>{transaction.type}</GridItem>
        <GridItem fontWeight={"bold"}>Дата</GridItem>
        <GridItem>
          <DateWithTime date={transaction.createdAt} />
        </GridItem>
        <GridItem fontWeight={"bold"}>Сумма</GridItem>
        <GridItem>
          <Money amount={transaction.amount.amount} />
        </GridItem>
        {
          // transaction.type === TransactionType.payout && transaction.paymentMethodDetail && (
          transaction.type === TransactionTypeEnum.MANUAL_ADJUSTMENT &&
            transaction.paymentMethod && (
              <>
                <GridItem fontWeight={"bold"}>Способ перевода</GridItem>
                <GridItem>
                  {
                    // transaction.paymentMethodDetail?.paymentMethod.description
                    transaction.paymentMethod.description
                  }
                </GridItem>
                <GridItem fontWeight={"bold"}>Реквизиты</GridItem>
                <GridItem>
                  <PaymentMethodDetail
                    paymentMethodDetail={
                      // transaction.paymentMethodDetail
                      transaction.paymentMethod.title
                    }
                  />
                </GridItem>
              </>
            )
        }
      </Grid>
    </>
  )
}
