"use client"
import { Suspense } from "react"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter, useSearchParams } from "next/navigation"

import Layout from "src/core/layouts/Layout"
import getPaymentMethods from "src/payment-methods/queries/getPaymentMethods"

const ITEMS_PER_PAGE = 100

const PaymentMethodsList = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams?.get("page") || "0")
  const [{ paymentMethods, hasMore }] = usePaginatedQuery(getPaymentMethods, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push(`/payment-methods?page=${page - 1}`)
  const goToNextPage = () => router.push(`/payment-methods?page=${page + 1}`)

  return (
    <div>
      <ul>
        {paymentMethods.map((paymentMethod) => (
          <li key={paymentMethod.id}>
            <Link href={`/payment-methods/${paymentMethod.id}`}>{paymentMethod.name}</Link>
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

const PaymentMethodsPage = () => {
  return (
    <Layout>
      <title>PaymentMethods</title>

      <div>
        <p>
          <Link href={"/payment-methods/new"}>Create PaymentMethod</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <PaymentMethodsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default PaymentMethodsPage
