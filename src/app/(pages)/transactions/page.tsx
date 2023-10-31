"use client"
import { Suspense } from "react"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter, useSearchParams } from "next/navigation"

import Layout from "src/core/layouts/Layout"
import getTransactions from "src/transactions/queries/getTransactions"

const ITEMS_PER_PAGE = 100

const TransactionsList = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams?.get("page") || "0")
  const [{ transactions, hasMore }] = usePaginatedQuery(getTransactions, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push(`/transactions?page=${page - 1}`)
  const goToNextPage = () => router.push(`/transactions?page=${page + 1}`)

  return (
    <div>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <Link href={`/transactions/${transaction.id}`}>{transaction.id}</Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const TransactionsPage = () => {
  return (
    <Layout>
      <title>Transactions</title>

      <div>
        <p>
          <Link href={`/transactions/new`}>Create Transaction</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TransactionsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default TransactionsPage
