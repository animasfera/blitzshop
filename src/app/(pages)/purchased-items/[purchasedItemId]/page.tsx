"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import getPurchasedItem from "src/purchased-items/queries/getPurchasedItem"
import deletePurchasedItem from "src/purchased-items/mutations/deletePurchasedItem"

const PurchasedItem = () => {
  const router = useRouter()
  const purchasedItemId: number = parseInt((useParams()?.purchasedItemId as any) || "-1")
  const [deletePurchasedItemMutation] = useMutation(deletePurchasedItem)
  const [purchasedItem] = useQuery(getPurchasedItem, { id: purchasedItemId })

  return (
    <>
      <title>PurchasedItem {purchasedItem.id}</title>

      <div>
        <h1>PurchasedItem {purchasedItem.id}</h1>
        <pre>{JSON.stringify(purchasedItem, null, 2)}</pre>

        <Link href={`/purchased-items/${purchasedItem.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deletePurchasedItemMutation({ id: purchasedItem.id })
              await router.push(`/purchased-items`)
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
        <Link href={`/purchased-items`}>PurchasedItems</Link>
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
