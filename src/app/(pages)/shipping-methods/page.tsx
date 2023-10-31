"use client"
import { Suspense } from "react"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter, useSearchParams } from "next/navigation"
import Layout from "src/core/layouts/Layout"
import getShippingMethods from "src/shipping-methods/queries/getShippingMethods"

const ITEMS_PER_PAGE = 100

const ShippingMethodsList = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams?.get("page") || "0")
  const [{ shippingMethods, hasMore }] = usePaginatedQuery(getShippingMethods, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  const goToPreviousPage = () => router.push(`/shipping-methods?page=${page - 1}`)
  const goToNextPage = () => router.push(`/shipping-methods?page=${page + 1}`)

  return (
    <div>
      <ul>
        {shippingMethods.map((shippingMethod) => (
          <li key={shippingMethod.id}>
            <Link href={`/shipping-methods/${shippingMethod.id}`}>{shippingMethod.title}</Link>
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

const ShippingMethodsPage = () => {
  return (
    <Layout>
      <title>ShippingMethods</title>

      <div>
        <p>
          <Link href={`/shipping-methods/new`}>Create ShippingMethod</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ShippingMethodsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default ShippingMethodsPage
