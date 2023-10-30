"use client"
import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter, useSearchParams } from "next/navigation"
import Layout from "src/core/layouts/Layout"
import getItemToRefunds from "src/item-to-refunds/queries/getItemToRefunds"

const ITEMS_PER_PAGE = 100

const ItemToRefundsList = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams?.get("page") || "0")
  const [{ itemToRefunds, hasMore }] = usePaginatedQuery(getItemToRefunds, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push(`/item-to-refunds?page=${page - 1}`)
  const goToNextPage = () => router.push(`/item-to-refunds?page=${page + 1}`)

  return (
    <div>
      <ul>
        {itemToRefunds.map((itemToRefund) => (
          <li key={itemToRefund.id}>
            <Link href={`/item-to-refunds/${itemToRefund.id}`}>{itemToRefund.id}</Link>
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

const ItemToRefundsPage = () => {
  return (
    <Layout>
      <Head>
        <title>ItemToRefunds</title>
      </Head>

      <div>
        <p>
          <Link href={`/item-ro-refunds/new`}>Create ItemToRefund</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ItemToRefundsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default ItemToRefundsPage
