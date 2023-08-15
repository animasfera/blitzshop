"use client"
import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"

import Layout from "src/core/layouts/Layout"
import getCarts from "src/carts/queries/getCarts"

const ITEMS_PER_PAGE = 100

export const CartsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ carts, hasMore }] = usePaginatedQuery(getCarts, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {carts.map((cart) => (
          <li key={cart.id}>
            <Link href={Routes.ShowCartPage({ cartId: cart.id })}>{cart.numItems}</Link>
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

const CartsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Carts</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewCartPage()}>Create Cart</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <CartsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default CartsPage
