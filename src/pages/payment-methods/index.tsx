import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import getPaymentMethods from "src/payment-methods/queries/getPaymentMethods"

const ITEMS_PER_PAGE = 100

export const PaymentMethodsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ paymentMethods, hasMore }] = usePaginatedQuery(getPaymentMethods, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {paymentMethods.map((paymentMethod) => (
          <li key={paymentMethod.id}>
            <Link
              href={Routes.ShowPaymentMethodPage({
                paymentMethodId: paymentMethod.id,
              })}
            >
              {paymentMethod.name}
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

const PaymentMethodsPage = () => {
  return (
    <Layout>
      <Head>
        <title>PaymentMethods</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewPaymentMethodPage()}>Create PaymentMethod</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <PaymentMethodsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default PaymentMethodsPage
