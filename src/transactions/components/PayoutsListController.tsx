import { useState } from "react"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { Box, Flex, Heading } from "@chakra-ui/react"
import { Prisma } from "db"

import { Modal } from "src/core/components/Modal"
import { usePagination } from "src/core/hooks/usePagination"
import { ListOrNotFoundMessage } from "src/core/components/ListOrNotFoundMessage"
import { PayoutsList } from "./PayoutsList"
import getPayouts from "../queries/getPayouts"
import { TransactionController } from "./TransactionController"
import { PayoutsFilter } from "./PayoutsFilter"

const ITEMS_PER_PAGE = 100

type ControllerProps = {
  withHeading?: boolean
  withFilter?: boolean
  editable?: boolean
} & Pick<Prisma.TransactionFindManyArgs, "where" | "orderBy">

export const PayoutsListController = (props: ControllerProps) => {
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

  const orderBy = initialOrderBy
    ? initialOrderBy
    : ({ id: "desc" } as Prisma.TransactionOrderByWithRelationInput)

  const [{ transactions, hasMore }] = usePaginatedQuery(getPayouts, {
    orderBy,
    where: {
      ...initialFilter,
      ...filter,
    },
    skip: ITEMS_PER_PAGE * pagination.page,
    take: ITEMS_PER_PAGE,
  })

  return (
    <>
      {withHeading && <Heading>Выплаты</Heading>}

      {/* @ts-ignore */}
      <Modal
        size={"full"}
        isOpen={!!viewTransactionId}
        onClose={() => setViewTransactionId(undefined)}
      >
        {!!viewTransactionId ? <TransactionController id={viewTransactionId} /> : <></>}
      </Modal>

      <Flex flexDirection={["column", "row"]}>
        {withFilter && (
          <Box mb={[6, 0]}>
            <PayoutsFilter _onChange={(filter) => setFilter(filter)} onSubmit={() => {}} />
          </Box>
        )}
        <Box flexGrow={1} ml={withFilter ? [0, 10] : 0}>
          <ListOrNotFoundMessage objects={transactions} pagination={pagination} hasMore={hasMore}>
            <PayoutsList
              transactions={transactions}
              onRowClick={(transaction) => {
                editable && setViewTransactionId(transaction.id)
              }}
            />
          </ListOrNotFoundMessage>
        </Box>
      </Flex>
    </>
  )
}
