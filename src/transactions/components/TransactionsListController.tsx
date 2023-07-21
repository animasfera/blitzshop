import { useRouter } from "next/router"
import { useState } from "react"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { Box, Flex, Heading, Icon } from "@chakra-ui/react"
import { Prisma } from "db"

import { TransactionsFilter } from "./TransactionsFilter"
import { TransactionsList } from "./TransactionsList"

import { Modal } from "src/core/components/Modal"
import { ListOrNotFoundMessage } from "src/core/components/ListOrNotFoundMessage"
import { InvoiceController } from "src/invoices/components/InvoiceController"
import { usePagination } from "src/core/hooks/usePagination"
import { Loading } from "src/core/components/Loading"
import { TransactionController } from "./TransactionController"
import getTransactions from "../queries/getTransactions"
// import { BookingController } from "src/bookings/components/BookingController"

const ITEMS_PER_PAGE = 100

type ControllerProps = {
  withHeading?: boolean
  withFilter?: boolean
  editable?: boolean
} & Pick<Prisma.TransactionFindManyArgs, "where" | "orderBy">

export const TransactionsListController = (props: ControllerProps) => {
  const {
    where: initialFilter,
    orderBy: initialOrderBy,
    withHeading = false,
    withFilter = false,
    editable = false,
  } = props

  const [filter, setFilter] = useState({})
  const pagination = usePagination()

  const [viewTransactionId, setViewTransactionId] = useState<number | undefined>()
  const [viewBookingId, setViewBookingId] = useState<number | undefined>()
  const [viewInvoiceId, setViewInvoiceId] = useState<number | undefined>()

  const orderBy = initialOrderBy
    ? initialOrderBy
    : ({ id: "desc" } as Prisma.TransactionOrderByWithRelationInput)

  const [{ transactions, hasMore }] = usePaginatedQuery(getTransactions, {
    orderBy,
    where: { ...initialFilter, ...filter },
    skip: ITEMS_PER_PAGE * pagination.page,
    take: ITEMS_PER_PAGE,
  })

  return (
    <>
      {withHeading && <Heading>Транзакции</Heading>}
      {/* @ts-ignore */}
      <Modal
        size={"full"}
        isOpen={!!viewTransactionId}
        onClose={() => setViewTransactionId(undefined)}
      >
        {!!viewTransactionId ? <TransactionController id={viewTransactionId} /> : <></>}
      </Modal>

      {/* @ts-ignore */}
      <Modal size={"3xl"} isOpen={!!viewInvoiceId} onClose={() => setViewInvoiceId(undefined)}>
        {viewInvoiceId ? (
          <Loading>
            <InvoiceController id={viewInvoiceId} />
          </Loading>
        ) : (
          <></>
        )}
      </Modal>

      {/* @ts-ignore */}
      <Modal size={"3xl"} isOpen={!!viewBookingId} onClose={() => setViewBookingId(undefined)}>
        {viewBookingId ? (
          <Loading>
            {/* <BookingController id={viewBookingId} /> */}
            <>BookingController</>
          </Loading>
        ) : (
          <></>
        )}
      </Modal>
      <Flex flexDirection={["column", "row"]}>
        {withFilter && (
          <Box mb={[6, 0]}>
            <TransactionsFilter _onChange={(filter) => setFilter(filter)} onSubmit={() => {}} />
          </Box>
        )}
        <Box flexGrow={1} ml={withFilter ? [0, 10] : 0}>
          <ListOrNotFoundMessage objects={transactions} pagination={pagination} hasMore={hasMore}>
            <TransactionsList
              transactions={transactions}
              onRowClick={(transaction) => {
                editable && setViewTransactionId(transaction.id)
              }}
              onInvoiceClick={(invoiceId) => {
                setViewInvoiceId(invoiceId)
              }}
            />
          </ListOrNotFoundMessage>
        </Box>
      </Flex>
    </>
  )
}
