"use client"
import { Suspense } from "react"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter, useSearchParams } from "next/navigation"
import Layout from "src/core/layouts/Layout"
import getCountries from "src/countries/queries/getCountries"

const ITEMS_PER_PAGE = 20

const CountriesList = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams?.get("page") || "0")
  const [{ countries, hasMore }] = usePaginatedQuery(getCountries, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push(`/countries?page=${page - 1}`)
  const goToNextPage = () => router.push(`/countries?page=${page + 1}`)

  return (
    <div>
      <ul>
        {countries.map((country) => (
          <li key={country.id}>
            <Link href={"/countries/" + country.id}>{country.id}</Link>
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

const CountriesPage = () => {
  return (
    <Layout>
      <Head>
        <title>Countries</title>
      </Head>

      <div>
        <p>
          <Link href={"/countries/new"}>Create Country</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <CountriesList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default CountriesPage
