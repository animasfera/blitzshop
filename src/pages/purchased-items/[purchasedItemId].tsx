"use client"
import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getPurchasedItem from "src/purchased-items/queries/getPurchasedItem"
import deletePurchasedItem from "src/purchased-items/mutations/deletePurchasedItem"

export const PurchasedItem = () => {
  const router = useRouter()
  const purchasedItemId = useParam("purchasedItemId", "number")
  const [deletePurchasedItemMutation] = useMutation(deletePurchasedItem)
  const [purchasedItem] = useQuery(getPurchasedItem, { id: purchasedItemId })

  return (
    <>
      <Head>
        <title>PurchasedItem {purchasedItem.id}</title>
      </Head>

      <div>
        <h1>PurchasedItem {purchasedItem.id}</h1>
        <pre>{JSON.stringify(purchasedItem, null, 2)}</pre>

        <Link
          href={Routes.EditPurchasedItemPage({
            purchasedItemId: purchasedItem.id,
          })}
        >
          Edit
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deletePurchasedItemMutation({ id: purchasedItem.id })
              await router.push(Routes.PurchasedItemsPage())
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

const ShowPurchasedItemPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.PurchasedItemsPage()}>PurchasedItems</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <PurchasedItem />
      </Suspense>
    </div>
  )
}

ShowPurchasedItemPage.authenticate = true
ShowPurchasedItemPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPurchasedItemPage
