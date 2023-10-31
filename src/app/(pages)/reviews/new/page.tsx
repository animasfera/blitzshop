"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import { CreateReviewSchema } from "src/reviews/schemas"
import createReview from "src/reviews/mutations/createReview"
import { ReviewForm, FORM_ERROR } from "src/reviews/components/ReviewForm"

const NewReviewPage = () => {
  const router = useRouter()
  const [createReviewMutation] = useMutation(createReview)

  return (
    <Layout title={"Create New Review"}>
      <h1>Create New Review</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ReviewForm
          submitText="Create Review"
          schema={CreateReviewSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const review = await createReviewMutation(values)
              await router.push(`/reviews/${review.id}`)
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </Suspense>
      <p>
        <Link href={`/reviews`}>Reviews</Link>
      </p>
    </Layout>
  )
}

NewReviewPage.authenticate = true

export default NewReviewPage
