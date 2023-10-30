"use client"
import { Suspense } from "react"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter, useSearchParams } from "next/navigation"

import Layout from "src/core/layouts/Layout"
import getInvoices from "src/invoices/queries/getInvoices"

const ITEMS_PER_PAGE = 100

const InvoicesList = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams?.get("page") || "0")
  const [{ invoices, hasMore }] = usePaginatedQuery(getInvoices, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push(`/countries?page=${page - 1}`)
  const goToNextPage = () => router.push(`/countries?page=${page + 1}`)
  return (
    <div>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            <Link href={`/invoices/${invoice.id}`}>{invoice.id}</Link>
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

const InvoicesPage = () => {
  return (
    <Layout>
      <Head>
        <title>Invoices</title>
      </Head>

      <div>
        <p>
          <Link href={`/invoices/new`}>Create Invoice</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <InvoicesList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default InvoicesPage
