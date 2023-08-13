"use client"
import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"

import Layout from "src/core/layouts/Layout"
import getPurchasedItems from "src/purchased-items/queries/getPurchasedItems"

const ITEMS_PER_PAGE = 100

export const PurchasedItemsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ purchasedItems, hasMore }] = usePaginatedQuery(getPurchasedItems, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {purchasedItems.map((purchasedItem) => (
          <li key={purchasedItem.id}>
            <Link
              href={Routes.ShowPurchasedItemPage({
                purchasedItemId: purchasedItem.id,
              })}
            >
              {purchasedItem.title}
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

const PurchasedItemsPage = () => {
  return (
    <Layout>
      <Head>
        <title>PurchasedItems</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewPurchasedItemPage()}>Create PurchasedItem</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <PurchasedItemsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default PurchasedItemsPage
