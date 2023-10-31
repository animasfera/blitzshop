"use client"
import { Suspense } from "react"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter, useSearchParams } from "next/navigation"
import Layout from "src/core/layouts/Layout"
import getPurchasedItems from "src/purchased-items/queries/getPurchasedItems"

const ITEMS_PER_PAGE = 100

const PurchasedItemsList = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams?.get("page") || "0")
  const [{ purchasedItems, hasMore }] = usePaginatedQuery(getPurchasedItems, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push(`/purchased-items?page=${page - 1}`)
  const goToNextPage = () => router.push(`/purchased-items?page=${page + 1}`)

  return (
    <div>
      <ul>
        {purchasedItems.map((purchasedItem) => (
          <li key={purchasedItem.id}>
            <Link href={`/purchased-items/${purchasedItem.id}`}>{purchasedItem.title}</Link>
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
      <title>PurchasedItems</title>

      <div>
        <p>
          <Link href={`/purchased-items/new`}>Create PurchasedItem</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <PurchasedItemsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default PurchasedItemsPage
