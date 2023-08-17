"use client"
import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getItemToRefund from "src/item-to-refunds/queries/getItemToRefund"
import deleteItemToRefund from "src/item-to-refunds/mutations/deleteItemToRefund"

export const ItemToRefund = () => {
  const router = useRouter()
  const itemToRefundId = useParam("itemToRefundId", "number")
  const [deleteItemToRefundMutation] = useMutation(deleteItemToRefund)
  const [itemToRefund] = useQuery(getItemToRefund, { id: itemToRefundId })

  return (
    <>
      <Head>
        <title>ItemToRefund {itemToRefund.id}</title>
      </Head>

      <div>
        <h1>ItemToRefund {itemToRefund.id}</h1>
        <pre>{JSON.stringify(itemToRefund, null, 2)}</pre>

        <Link
          href={Routes.EditItemToRefundPage({
            itemToRefundId: itemToRefund.id,
          })}
        >
          Edit
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteItemToRefundMutation({ id: itemToRefund.id })
              await router.push(Routes.ItemToRefundsPage())
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
        <Link href={Routes.ItemToRefundsPage()}>ItemToRefunds</Link>
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
