import { useState } from "react"
import { useRouter } from "next/router"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { Box } from "@chakra-ui/react"

import { Table } from "src/core/table/Table"
import { DateWithTime } from "src/core/components/Date"
import { currencyFormat } from "src/core/helpers/Helpers"
import Pagination from "src/core/components/Pagination"
import getTransactions from "../queries/getTransactions"
import { TransactionsFilter } from "./TransactionsFilter"
import { TransactionStatusBadge } from "./TransactionStatusBadge"
import { TransactionTypesRu } from "./TransactionEnums"

const ITEMS_PER_PAGE = 100

export const TransactionsTable = (props) => {
  const { filter: _filter, orderBy } = props
  const router = useRouter()
  const page = Number(router.query.page) || 0

  const [filter, setFilter] = useState({})

  const [{ transactions, hasMore }] = usePaginatedQuery(getTransactions, {
    orderBy: { id: "desc", ...orderBy },
    where: { ..._filter, ...filter },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const cols = [
    {
      Header: "ID",
      accessor: "id", // accessor is the "key" in the data
    },
    {
      Header: "Дата",
      accessor: "createdAt",
      Cell: ({ row }) => {
        return <DateWithTime date={row.original.createdAt} />
      },
    },
    {
      Header: "Сумма",
      accessor: "amount",
      Cell: ({ row }) => {
        // @ts-ignore
        return currencyFormat({ amount: row.original.amount, currency: row.original.currency })
      },
    },
    {
      Header: "Тип",
      accessor: "type",
      Cell: ({ row }) => {
        return TransactionTypesRu[row.original.type]
      },
    },
    {
      Header: "Статус",
      Cell: ({ row }) => {
        return <TransactionStatusBadge status={row.original.status} />
      },
    },
  ]

  return (
    <>
      <TransactionsFilter
        onSubmit={() => {}}
        _onChange={(values) => {
          setFilter(values)
        }}
      />
      <Box overflow={"scroll"}>
        <Table cols={cols} data={transactions} />
      </Box>
      <Pagination page={page} hasMore={hasMore} />
    </>
  )
}
