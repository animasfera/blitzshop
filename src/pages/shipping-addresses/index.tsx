import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"

import Layout from "src/core/layouts/Layout"
import getShippingAddresses from "src/shipping-addresses/queries/getShippingAddresses"

const ITEMS_PER_PAGE = 100

export const ShippingAddressesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ shippingAddresses, hasMore }] = usePaginatedQuery(getShippingAddresses, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {shippingAddresses.map((shippingAddress) => (
          <li key={shippingAddress.id}>
            <Link
              href={Routes.ShowShippingAddressPage({
                shippingAddressId: shippingAddress.id,
              })}
            >
              {shippingAddress.address}
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

const ShippingAddressesPage = () => {
  return (
    <Layout>
      <Head>
        <title>ShippingAddresses</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewShippingAddressPage()}>Create ShippingAddress</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ShippingAddressesList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default ShippingAddressesPage
