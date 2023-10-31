"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { useQuery, useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import getItemToRefund from "src/item-to-refunds/queries/getItemToRefund"
import deleteItemToRefund from "src/item-to-refunds/mutations/deleteItemToRefund"

const ItemToRefund = () => {
  const router = useRouter()
  const itemToRefundId: number = parseInt((useParams()?.itemToRefundId as any) || "-1")
  const [deleteItemToRefundMutation] = useMutation(deleteItemToRefund)
  const [itemToRefund] = useQuery(getItemToRefund, { id: itemToRefundId })

  return (
    <>
      <title>ItemToRefund {itemToRefund.id}</title>

      <div>
        <h1>ItemToRefund {itemToRefund.id}</h1>
        <pre>{JSON.stringify(itemToRefund, null, 2)}</pre>

        <Link href={`/item-to-refunds/${itemToRefund.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteItemToRefundMutation({ id: itemToRefund.id })
              await router.push(`/item-to-refunds`)
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

const ShowItemToRefundPage = () => {
  return (
    <div>
      <p>
        <Link href={`/item-to-refunds`}>ItemToRefunds</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <ItemToRefund />
      </Suspense>
    </div>
  )
}

ShowItemToRefundPage.authenticate = true
ShowItemToRefundPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowItemToRefundPage
