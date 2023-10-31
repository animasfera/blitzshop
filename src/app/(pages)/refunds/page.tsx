"use client"
import { Suspense } from "react"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter, useSearchParams } from "next/navigation"

import Layout from "src/core/layouts/Layout"
import getRefunds from "src/refunds/queries/getRefunds"

const ITEMS_PER_PAGE = 100

const RefundsList = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams?.get("page") || "0")
  const [{ refunds, hasMore }] = usePaginatedQuery(getRefunds, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push(`/refunds?page=${page - 1}`)
  const goToNextPage = () => router.push(`/refunds?page=${page + 1}`)

  return (
    <div>
      <ul>
        {refunds.map((refund) => (
          <li key={refund.id}>
            <Link href={`/refunds${refund.id}`}>{refund.id}</Link>
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
      <title>Refunds</title>

      <div>
        <p>
          <Link href={`/refunds/new`}>Create Refund</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <RefundsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default RefundsPage
