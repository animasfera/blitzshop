import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"

import Layout from "src/core/layouts/Layout"
import getTransactions from "src/transactions/queries/getTransactions"

const ITEMS_PER_PAGE = 100

export const TransactionsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ transactions, hasMore }] = usePaginatedQuery(getTransactions, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <Link
              href={Routes.ShowTransactionPage({
                transactionId: transaction.id,
              })}
            >
              {transaction.id}
            </Link>
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
      <Head>
        <title>Transactions</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewTransactionPage()}>Create Transaction</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TransactionsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default TransactionsPage
