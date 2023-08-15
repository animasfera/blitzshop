"use client"
import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getReview from "src/reviews/queries/getReview"
import deleteReview from "src/reviews/mutations/deleteReview"

export const Review = () => {
  const router = useRouter()
  const reviewId = useParam("reviewId", "number")
  const [deleteReviewMutation] = useMutation(deleteReview)
  const [review] = useQuery(getReview, { id: reviewId })

  return (
    <>
      <Head>
        <title>Review {review.id}</title>
      </Head>

      <div>
        <h1>Review {review.id}</h1>
        <pre>{JSON.stringify(review, null, 2)}</pre>

        <Link href={Routes.EditReviewPage({ reviewId: review.id })}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteReviewMutation({ id: review.id })
              await router.push(Routes.ReviewsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowReviewPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ReviewsPage()}>Reviews</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Review />
      </Suspense>
    </div>
  )
}

ShowReviewPage.authenticate = true
ShowReviewPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowReviewPage
