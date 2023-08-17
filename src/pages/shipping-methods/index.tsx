"use client"
import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"

import Layout from "src/core/layouts/Layout"
import getShippingMethods from "src/shipping-methods/queries/getShippingMethods"

const ITEMS_PER_PAGE = 100

export const ShippingMethodsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ shippingMethods, hasMore }] = usePaginatedQuery(getShippingMethods, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {shippingMethods.map((shippingMethod) => (
          <li key={shippingMethod.id}>
            <Link
              href={Routes.ShowShippingMethodPage({
                shippingMethodId: shippingMethod.id,
              })}
            >
              {shippingMethod.title}
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

const ShippingMethodsPage = () => {
  return (
    <Layout>
      <Head>
        <title>ShippingMethods</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewShippingMethodPage()}>Create ShippingMethod</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ShippingMethodsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default ShippingMethodsPage
