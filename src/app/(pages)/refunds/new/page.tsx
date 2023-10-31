"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import { CreateRefundSchema } from "src/refunds/schemas"
import createRefund from "src/refunds/mutations/createRefund"
import { RefundForm, FORM_ERROR } from "src/refunds/components/RefundForm"

const NewRefundPage = () => {
  const router = useRouter()
  const [createRefundMutation] = useMutation(createRefund)

  return (
    <Layout title={"Create New Refund"}>
      <h1>Create New Refund</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <RefundForm
          submitText="Create Refund"
          schema={CreateRefundSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const refund = await createRefundMutation(values)
              await router.push(`/refunds${refund.id}`)
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
        <Link href={`/refunds`}>Refunds</Link>
      </p>
    </Layout>
  )
}

NewRefundPage.authenticate = true

export default NewRefundPage
