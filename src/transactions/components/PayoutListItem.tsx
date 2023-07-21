import { Avatar, Box, GridItem } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import {
  Invoice,
  PaymentMethod,
  Price,
  Transaction,
  TransactionTypeEnum,
  User,
} from "@prisma/client"

import { Date } from "src/core/components/Date"
import { StatusBadge } from "src/core/components/StatusBadge"
import { InvoiceLink } from "src/invoices/components/InvoiceLink"
import { Money } from "src/core/components/Money"

export const PayoutListItem = (props: {
  transaction: Transaction & {
    amount: Price
    user: User
    paymentMethod: PaymentMethod
    feeTotal: Price
    invoice: Invoice
    net: Price
  }
  onInvoiceClick?: (id: number) => void
  onClick?: (
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
  const { transaction, onInvoiceClick, onClick } = props

  const avatarUrl = transaction.user.avatarUrl
  const username = transaction.user.username
  const net = transaction.net

  const { t } = useTranslation(["transaction"])

  return (
    <Box
      onClick={() => onClick && onClick(transaction)}
      display={"contents"}
      className={"grid-row"}
    >
      <GridItem
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        w={"48px"}
        flexBasis={"48px"}
        flexShrink={0}
        py={3}
      >
        <Avatar src={avatarUrl} size={"md"} />
      </GridItem>
      <GridItem
        display={"flex"}
        px={2}
        alignItems={["left", "left", "center"]}
        fontSize={14}
        flexDirection={["column", "column", "column", "row"]}
      >
        <Box as={"b"} flexGrow={1} w={["auto", "auto", "auto", "33%"]} textAlign={"left"} pl={2}>
          {username}
        </Box>
        <Box
          fontSize={14}
          w={["auto", "auto", "auto", "33%"]}
          flexGrow={1}
          color={"gray.500"}
          textAlign={"center"}
        >
          {t("transaction:type." + transaction.type)}
        </Box>
        {transaction.invoiceId && (
          <InvoiceLink
            isCreditNote={transaction.type === TransactionTypeEnum.REFUND}
            id={transaction.invoiceId!}
            onClick={() => {
              onInvoiceClick && onInvoiceClick(transaction.invoiceId!)
            }}
            textAlign={"center"}
            w={["auto", "auto", "auto", "33%"]}
            flexGrow={1}
            bookingId={transaction.invoiceId}
          />
        )}
      </GridItem>

      <GridItem
        fontSize={14}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        px={2}
      >
        <Date as={"div"} date={transaction.createdAt} textAlign={"center"} lineHeight={"16px"} />
      </GridItem>

      <GridItem
        px={2}
        fontSize={14}
        alignItems={"center"}
        justifyContent={"center"}
        display={["flex"]}
      >
        <StatusBadge status={transaction.status} display={["none", "block"]} />
      </GridItem>

      <GridItem
        pl={2}
        textAlign={"right"}
        display={"flex"}
        alignItems={"center"}
        flexGrow={1}
        justifyContent={"flex-end"}
      >
        <Box color={net.amount > 0 ? "green.300" : "red.300"} fontWeight={"bold"}>
          <Money amount={net.amount} currency={transaction.amount.currency} />
        </Box>
      </GridItem>
    </Box>
  )
}
