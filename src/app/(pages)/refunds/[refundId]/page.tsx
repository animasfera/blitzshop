"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation } from "@blitzjs/rpc"

import getRefund from "src/refunds/queries/getRefund"
import deleteRefund from "src/refunds/mutations/deleteRefund"
import Layout from "src/core/layouts/Layout"

const Refund = () => {
  const router = useRouter()
  const refundId: number = parseInt((useParams()?.refundId as any) || "-1")
  const [deleteRefundMutation] = useMutation(deleteRefund)
  const [refund] = useQuery(getRefund, { id: refundId })

  return (
    <>
      <title>Refund {refund.id}</title>

      <div>
        <h1>Refund {refund.id}</h1>
        <pre>{JSON.stringify(refund, null, 2)}</pre>

        <Link href={`/refunds/${refund.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteRefundMutation({ id: refund.id })
              await router.push(`/refunds`)
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

const ShowRefundPage = () => {
  return (
    <div>
      <p>
        <Link href={`/refunds`}>Refunds</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Refund />
      </Suspense>
    </div>
  )
}

ShowRefundPage.authenticate = true
ShowRefundPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowRefundPage
