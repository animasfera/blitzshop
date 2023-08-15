"use client"
import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import { UpdateRefundSchema } from "src/refunds/schemas"
import getRefund from "src/refunds/queries/getRefund"
import updateRefund from "src/refunds/mutations/updateRefund"
import { RefundForm, FORM_ERROR } from "src/refunds/components/RefundForm"

export const EditRefund = () => {
  const router = useRouter()
  const refundId = useParam("refundId", "number")
  const [refund, { setQueryData }] = useQuery(
    getRefund,
    { id: refundId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateRefundMutation] = useMutation(updateRefund)

  return (
    <>
      <Head>
        <title>Edit Refund {refund.id}</title>
      </Head>

      <div>
        <h1>Edit Refund {refund.id}</h1>
        <pre>{JSON.stringify(refund, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <RefundForm
            submitText="Update Refund"
            schema={UpdateRefundSchema}
            initialValues={refund}
            onSubmit={async (values) => {
              try {
                const updated = await updateRefundMutation({
                  id: refund.id,
                  // ...values,
                })
                await setQueryData(updated)
                await router.push(Routes.ShowRefundPage({ refundId: updated.id }))
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

const EditRefundPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditRefund />
      </Suspense>

      <p>
        <Link href={Routes.RefundsPage()}>Refunds</Link>
      </p>
    </div>
  )
}

EditRefundPage.authenticate = true
EditRefundPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditRefundPage
