"use client"
import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"

import Layout from "src/core/layouts/Layout"
import getReviews from "src/reviews/queries/getReviews"

const ITEMS_PER_PAGE = 100

export const ReviewsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ reviews, hasMore }] = usePaginatedQuery(getReviews, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <Link href={Routes.ShowReviewPage({ reviewId: review.id })}>{review.id}</Link>
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
      <Head>
        <title>Reviews</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewReviewPage()}>Create Review</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ReviewsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default ReviewsPage
