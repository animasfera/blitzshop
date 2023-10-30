"use client"
import { Suspense } from "react"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter, useSearchParams } from "next/navigation"
import Layout from "src/core/layouts/Layout"
import getLocations from "src/locations/queries/getLocations"

const ITEMS_PER_PAGE = 100

const LocationsList = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams?.get("page") || "0")
  const [{ locations, hasMore }] = usePaginatedQuery(getLocations, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push(`/locations?page=${page - 1}`)
  const goToNextPage = () => router.push(`/locations?page=${page + 1}`)

  return (
    <div>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            <Link href={`/locations/${location.id}`}>{location.id}</Link>
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

const LocationsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Locations</title>
      </Head>

      <div>
        <p>
          <Link href={`/locations/new`}>Create Location</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <LocationsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default LocationsPage
