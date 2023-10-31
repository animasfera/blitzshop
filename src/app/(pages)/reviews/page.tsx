"use client"
import { Suspense } from "react"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter, useSearchParams } from "next/navigation"

import Layout from "src/core/layouts/Layout"
import getReviews from "src/reviews/queries/getReviews"

const ITEMS_PER_PAGE = 100

const ReviewsList = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams?.get("page") || "0")
  const [{ reviews, hasMore }] = usePaginatedQuery(getReviews, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push(`/reviews?page=${page - 1}`)
  const goToNextPage = () => router.push(`/reviews?page=${page + 1}`)

  return (
    <div>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <Link href={`/reviews${review.id}`}>{review.id}</Link>
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

const ReviewsPage = () => {
  return (
    <Layout>
      <title>Reviews</title>

      <div>
        <p>
          <Link href={`/reviews/new`}>Create Review</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ReviewsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default ReviewsPage
