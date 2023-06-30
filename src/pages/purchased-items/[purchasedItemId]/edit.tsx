import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import { UpdatePurchasedItemSchema } from "src/purchased-items/schemas"
import getPurchasedItem from "src/purchased-items/queries/getPurchasedItem"
import updatePurchasedItem from "src/purchased-items/mutations/updatePurchasedItem"
import { PurchasedItemForm, FORM_ERROR } from "src/purchased-items/components/PurchasedItemForm"

export const EditPurchasedItem = () => {
  const router = useRouter()
  const purchasedItemId = useParam("purchasedItemId", "number")
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
      <Head>
        <title>Edit PurchasedItem {purchasedItem.id}</title>
      </Head>

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
                await router.push(Routes.ShowPurchasedItemPage({ purchasedItemId: updated.id }))
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
        <Link href={Routes.PurchasedItemsPage()}>PurchasedItems</Link>
      </p>
    </div>
  )
}

EditPurchasedItemPage.authenticate = true
EditPurchasedItemPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPurchasedItemPage
