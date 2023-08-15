"use client"
import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import { CreatePurchasedItemSchema } from "src/purchased-items/schemas"
import createPurchasedItem from "src/purchased-items/mutations/createPurchasedItem"
import { PurchasedItemForm, FORM_ERROR } from "src/purchased-items/components/PurchasedItemForm"

const NewPurchasedItemPage = () => {
  const router = useRouter()
  const [createPurchasedItemMutation] = useMutation(createPurchasedItem)

  return (
    <Layout title={"Create New PurchasedItem"}>
      <h1>Create New PurchasedItem</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <PurchasedItemForm
          submitText="Create PurchasedItem"
          schema={CreatePurchasedItemSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const purchasedItem = await createPurchasedItemMutation(values)
              await router.push(
                Routes.ShowPurchasedItemPage({
                  purchasedItemId: purchasedItem.id,
                })
              )
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
        <Link href={Routes.PurchasedItemsPage()}>PurchasedItems</Link>
      </p>
    </Layout>
  )
}

NewPurchasedItemPage.authenticate = true

export default NewPurchasedItemPage
