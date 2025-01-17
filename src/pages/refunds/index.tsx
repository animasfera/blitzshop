"use client"
import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"

import Layout from "src/core/layouts/Layout"
import getRefunds from "src/refunds/queries/getRefunds"

const ITEMS_PER_PAGE = 100

export const RefundsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ refunds, hasMore }] = usePaginatedQuery(getRefunds, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {refunds.map((refund) => (
          <li key={refund.id}>
            <Link href={Routes.ShowRefundPage({ refundId: refund.id })}>{refund.id}</Link>
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

const RefundsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Refunds</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewRefundPage()}>Create Refund</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <RefundsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default RefundsPage
