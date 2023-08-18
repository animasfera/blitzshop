"use client"
import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getRefund from "src/refunds/queries/getRefund"
import deleteRefund from "src/refunds/mutations/deleteRefund"

export const Refund = () => {
  const router = useRouter()
  const refundId = useParam("refundId", "number")
  const [deleteRefundMutation] = useMutation(deleteRefund)
  const [refund] = useQuery(getRefund, { id: refundId })

  return (
    <>
      <Head>
        <title>Refund {refund.id}</title>
      </Head>

      <div>
        <h1>Refund {refund.id}</h1>
        <pre>{JSON.stringify(refund, null, 2)}</pre>

        <Link href={Routes.EditRefundPage({ refundId: refund.id })}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteRefundMutation({ id: refund.id })
              await router.push(Routes.RefundsPage())
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
        <Link href={Routes.RefundsPage()}>Refunds</Link>
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
