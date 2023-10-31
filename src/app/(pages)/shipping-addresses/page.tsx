"use client"
import { Suspense } from "react"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter, useSearchParams } from "next/navigation"

import Layout from "src/core/layouts/Layout"
import getShippingAddresses from "src/shipping-addresses/queries/getShippingAddresses"

const ITEMS_PER_PAGE = 100

const ShippingAddressesList = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams?.get("page") || "0")
  const [{ shippingAddresses, hasMore }] = usePaginatedQuery(getShippingAddresses, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push(`/shipping-addresses?page=${page - 1}`)
  const goToNextPage = () => router.push(`/shipping-addresses?page=${page + 1}`)

  return (
    <div>
      <ul>
        {shippingAddresses.map((shippingAddress) => (
          <li key={shippingAddress.id}>
            <Link href={`/shipping-addresses${shippingAddress.id}`}>{shippingAddress.address}</Link>
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

const ShippingAddressesPage = () => {
  return (
    <Layout>
      <title>ShippingAddresses</title>

      <div>
        <p>
          <Link href={`/shipping-addresses/new`}>Create ShippingAddress</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ShippingAddressesList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default ShippingAddressesPage
