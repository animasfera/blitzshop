"use client"
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import React from "react"
import { Date } from "src/core/components/Date"
import {
  Invoice,
  Item,
  Order,
  OrderStatusEnum,
  PaymentMethod,
  Transaction,
  User,
  InvoiceStatusEnum,
  CurrencyEnum,
} from "@prisma/client"
import { UserTaxDetails } from "src/users/components/UserTaxDetailsController"
import { Money } from "src/core/components/Money"
import { useTranslation } from "react-i18next"

export const InvoiceView = (props: {
  invoice: Invoice & {
    order: Order & { user: User }
    amount: number
    currency: CurrencyEnum
    creditNotes: Invoice[]
    originalInvoice: Invoice | null
    parentItem: Item & { user: User }
    paymentMethod: PaymentMethod
    transactions: Transaction[]
  }
}) => {
  const { invoice } = props

  /*
  const booking =
    invoice.type === PaymentType.sale ? invoice.booking : invoice.originalInvoice?.booking
    */
  const { t } = useTranslation(["invoice"])

  return (
    <>
      <Flex bg={"gray.100"} h={"70px"} mb={6} p={3} position={"relative"}>
        <Box maxH={"100%"}>
          <Image src={"/logo.svg"} maxH={"100%"} />
        </Box>
        <Box pt={3} pl={1}>
          Leela.Game
        </Box>
        <Box textAlign={"right"} flexGrow={1} alignItems={"center"} pt={3} fontWeight={"bold"}>
          {
            // invoice.type === PaymentType.sale &&
            invoice.order.status === OrderStatusEnum.COMPLETED && t("invoice")
          }
          {
            // invoice.type === PaymentType.refund &&
            invoice.order.status ===
              (OrderStatusEnum.REFUNDED ||
                OrderStatusEnum.REFUND_APPROVED ||
                OrderStatusEnum.REFUND_REJECTED ||
                OrderStatusEnum.REFUND_REQUESTED) && t("creditNote")
          }
        </Box>
      </Flex>

      <Flex mb={12} justifyContent={"right"}>
        <Box minWidth={"200px"}>
          <Grid templateColumns={"auto auto"} gap={2}>
            <GridItem fontWeight={"bold"}>{t("date")}</GridItem>
            <GridItem>
              <Date date={invoice.createdAt} />
            </GridItem>
            <GridItem fontWeight={"bold"}>
              {invoice.originalInvoiceId ? t("creditNote") + " #" : t("invoice") + " #"}
            </GridItem>
            <GridItem>{invoice.id}</GridItem>

            {invoice.originalInvoiceId && (
              <>
                <GridItem fontWeight={"bold"}>{t("originalInvoice")} #</GridItem>
                <GridItem>{invoice.originalInvoiceId}</GridItem>
              </>
            )}

            {
              // invoice.type === PaymentType.sale && (
              invoice.order.status === OrderStatusEnum.COMPLETED && (
                <>
                  <GridItem fontWeight={"bold"}>{t("order")} #</GridItem>
                  <GridItem>{invoice.orderId}</GridItem>
                </>
              )
            }
            {
              // invoice.type === PaymentType.refund && (
              invoice.order.status ===
                (OrderStatusEnum.REFUNDED ||
                  OrderStatusEnum.REFUND_APPROVED ||
                  OrderStatusEnum.REFUND_REJECTED ||
                  OrderStatusEnum.REFUND_REQUESTED) && (
                <>
                  <GridItem fontWeight={"bold"}>{t("order")} #</GridItem>
                  <GridItem>{invoice.orderId}</GridItem>
                </>
              )
            }
          </Grid>
        </Box>
      </Flex>

      <Flex flexDirection={["column", "row"]} mb={12}>
        <Box w={["100%", "50%"]}>
          <Heading size={"sm"}>{t("to")}:</Heading>
          <UserTaxDetails user={invoice.parentItem.user} />
        </Box>
        <Box w={["100%", "50%"]}>
          <Heading size={"sm"}>{t("from")}:</Heading>
          <UserTaxDetails user={invoice.order.user} />
        </Box>
      </Flex>

      {invoice.order && (
        <Box mb={8}>
          <Box overflow={"scroll"} mb={2}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>{t("itemDescription")}</Th>
                  <Th>{t("price")}</Th>
                  <Th>{t("qty")}</Th>
                  <Th>{t("amount")}</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{t("ticket")}</Td>
                  <Td>
                    <Money amount={invoice.amount} currency={invoice.currency} />
                  </Td>
                  <Td>
                    <Money amount={invoice.amount} currency={invoice.currency} />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
          <Box mt={2} mb={2} textAlign={"right"}>
            {t("total")}
            {invoice.status === InvoiceStatusEnum.PARTIALLY_PAID && " (" + t("paid") + ")"}:{" "}
            <Money amount={invoice.amount} currency={invoice.currency} />
          </Box>
        </Box>
      )}
    </>
  )
}
