import { Suspense } from "react"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { Transaction, User, Price, Invoice, PaymentMethod } from "@prisma/client"
import { Avatar, Box, Flex, Stack } from "@chakra-ui/react"

import { Money } from "src/core/components/Money"
import { DateWithTime } from "src/core/components/Date"
import getTransactionsWithUsers from "../queries/getTransactionsWithUsers"
import { TransactionTypesRu } from "./TransactionEnums"

const TransactionCompact = (props: {
  transaction: Transaction & {
    amount: Price
    user: User
    paymentMethod: PaymentMethod
    feeTotal: Price
    invoice: Invoice
    net: Price
  }
}) => {
  const { transaction } = props

  const avatarUrl = transaction.user ? transaction.user.avatarUrl || "" : "/logo.png"
  const username = transaction.user ? transaction.user.username : "leela.game"
  const amount = transaction.amount.amount || 0
  return (
    <Flex width={"100%"}>
      <Flex mr={3} justifyContent={"center"} flexDirection={"column"}>
        <Avatar src={avatarUrl} size={"md"} />
      </Flex>
      <Box flexGrow={1} fontSize={14}>
        <Box as={"b"}>{username}</Box>
        <Box fontSize={14} color={"gray.500"}>
          {TransactionTypesRu[transaction.type]}
        </Box>
      </Box>
      <DateWithTime as={"div"} date={transaction.createdAt} />
      <Box textAlign={"right"}>
        <Box color={amount > 0 ? "green.300" : "red.300"} fontWeight={"bold"}>
          {amount > 0 ? "+ " : "- "}
          <Money amount={amount} currency={transaction.amount.currency} />
        </Box>
      </Box>
    </Flex>
  )
}

const Transactions = () =>
  // props: { slotId: number }
  {
    // const { slotId } = props
    const [{ transactions }] = usePaginatedQuery(getTransactionsWithUsers, {
      // where: { slotId: slotId },
    })

    return (
      <Stack spacing={5}>
        {transactions.map((transaction) => (
          <TransactionCompact transaction={transaction} key={transaction.id} />
        ))}
      </Stack>
    )
  }

export const TransactionsListSuspended = () =>
  // props: { slotId: number }
  {
    // const { slotId } = props
    return (
      <Suspense fallback={<div>Загрузка...</div>}>
        <Transactions
        // slotId={slotId}
        />
      </Suspense>
    )
  }
