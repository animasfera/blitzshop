import { Box, Grid } from "@chakra-ui/react"
import { Transaction, User, Price, Invoice, PaymentMethod } from "@prisma/client"

import { PayoutListItem } from "./PayoutListItem"

export const PayoutsList = (props: {
  transactions: (Transaction & {
    amount: Price
    user: User
    paymentMethod: PaymentMethod
    feeTotal: Price
    invoice: Invoice
    net: Price
  })[]
  onInvoiceClick?: (invoiceId: number) => void
  onRowClick?: (
    transaction: Transaction & {
      amount: Price
      user: User
      paymentMethod: PaymentMethod
      feeTotal: Price
      invoice: Invoice
      net: Price
    }
  ) => void
}) => {
  let { transactions, onInvoiceClick, onRowClick } = props

  return (
    <Box>
      <Grid width={"100%"} py={3} templateColumns={"48px auto auto auto auto"}>
        {transactions.map((transaction) => (
          <PayoutListItem
            key={transaction.id}
            transaction={transaction}
            onInvoiceClick={(invoiceId) => onInvoiceClick && onInvoiceClick(invoiceId)}
            onClick={(transaction) => onRowClick && onRowClick(transaction)}
          />
        ))}
      </Grid>
    </Box>
  )
}
