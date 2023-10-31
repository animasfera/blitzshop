"use client"
import { Suspense } from "react"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter, useSearchParams } from "next/navigation"
import Layout from "src/core/layouts/Layout"
import getItems from "src/items/queries/getItems"

const ITEMS_PER_PAGE = 100

const ItemsList = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams?.get("page") || "0")
  const [{ items, hasMore }] = usePaginatedQuery(getItems, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push(`/items?page=${page - 1}`)
  const goToNextPage = () => router.push(`/items?page=${page + 1}`)

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`/items/${item.id}`}>{item.title}</Link>
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

const ItemsPage = () => {
  return (
    <Layout>
      <title>Items</title>

      <div>
        <p>
          <Link href={`/items/new`}>Create Item</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ItemsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default ItemsPage
