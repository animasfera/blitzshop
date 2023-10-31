"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import { UpdateReviewSchema } from "src/reviews/schemas"
import getReview from "src/reviews/queries/getReview"
import updateReview from "src/reviews/mutations/updateReview"
import { ReviewForm, FORM_ERROR } from "src/reviews/components/ReviewForm"

const EditReview = () => {
  const router = useRouter()
  const reviewId: number = parseInt((useParams()?.reviewId as any) || "-1")
  const [review, { setQueryData }] = useQuery(
    getReview,
    { id: reviewId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateReviewMutation] = useMutation(updateReview)

  return (
    <>
      <title>Edit Review {review.id}</title>

      <div>
        <h1>Edit Review {review.id}</h1>
        <pre>{JSON.stringify(review, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <ReviewForm
            submitText="Update Review"
            schema={UpdateReviewSchema}
            initialValues={review}
            onSubmit={async (values) => {
              try {
                const updated = await updateReviewMutation({
                  id: review.id,
                  // ...values,
                })
                await setQueryData(updated)
                await router.push(`/reviews/${updated.id}`)
              } catch (error: any) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
        </Suspense>
      </div>
    </>
  )
}

const EditReviewPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditReview />
      </Suspense>

      <p>
        <Link href={`/reviews`}>Reviews</Link>
      </p>
    </div>
  )
}

EditReviewPage.authenticate = true
EditReviewPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditReviewPage
