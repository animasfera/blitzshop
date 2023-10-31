"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import getReview from "src/reviews/queries/getReview"
import deleteReview from "src/reviews/mutations/deleteReview"

const Review = () => {
  const router = useRouter()
  const reviewId: number = parseInt((useParams()?.reviewId as any) || "-1")
  const [deleteReviewMutation] = useMutation(deleteReview)
  const [review] = useQuery(getReview, { id: reviewId })

  return (
    <>
      <title>Review {review.id}</title>

      <div>
        <h1>Review {review.id}</h1>
        <pre>{JSON.stringify(review, null, 2)}</pre>

        <Link href={`/reviews/${review.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteReviewMutation({ id: review.id })
              await router.push(`/reviews`)
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
        <Link href={`/reviews`}>Reviews</Link>
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
