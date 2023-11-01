"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import { UpdatePurchasedItemSchema } from "src/purchased-items/schemas"
import getPurchasedItem from "src/purchased-items/queries/getPurchasedItem"
import updatePurchasedItem from "src/purchased-items/mutations/updatePurchasedItem"
import { PurchasedItemForm, FORM_ERROR } from "src/purchased-items/components/PurchasedItemForm"

const EditPurchasedItem = () => {
  const router = useRouter()
  const purchasedItemId: number = parseInt((useParams()?.purchasedItemId as any) || "-1")
  const [purchasedItem, { setQueryData }] = useQuery(
    getPurchasedItem,
    { id: purchasedItemId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updatePurchasedItemMutation] = useMutation(updatePurchasedItem)

  return (
    <>
      <title>Edit PurchasedItem {purchasedItem.id}</title>

      <div>
        <h1>Edit PurchasedItem {purchasedItem.id}</h1>
        <pre>{JSON.stringify(purchasedItem, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <PurchasedItemForm
            submitText="Update PurchasedItem"
            schema={UpdatePurchasedItemSchema}
            initialValues={purchasedItem}
            onSubmit={async (values) => {
              try {
                const updated = await updatePurchasedItemMutation({
                  id: purchasedItem.id,
                  // ...values,
                })
                await setQueryData(updated)
                await router.push(`/purchased-items/updated.id`)
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

const EditPurchasedItemPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPurchasedItem />
      </Suspense>

      <p>
        <Link href={`/purchased-items`}>PurchasedItems</Link>
      </p>
    </div>
  )
}

EditPurchasedItemPage.authenticate = true
EditPurchasedItemPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPurchasedItemPage
