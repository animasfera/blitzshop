"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import { UpdateItemSchema } from "src/items/schemas"
import getItem from "src/items/queries/getItem"
import updateItem from "src/items/mutations/updateItem"
import { ItemForm } from "src/items/components/ItemForm"
import { FORM_ERROR } from "src/core/components/form/Form"

const EditItem = () => {
  const router = useRouter()
  const itemId: number = parseInt((useParams()?.itemId as any) || "-1")
  const [item, { setQueryData }] = useQuery(
    getItem,
    { id: itemId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateItemMutation] = useMutation(updateItem)

  return (
    <>
      <title>Edit Item {item.id}</title>

      <div>
        <h1>Edit Item {item.id}</h1>
        <pre>{JSON.stringify(item, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <ItemForm
            submitText="Update Item"
            schema={UpdateItemSchema}
            initialValues={item}
            onSubmit={async (values) => {
              try {
                const updated = await updateItemMutation({
                  id: item.id,
                  // ...values,
                })
                await setQueryData(updated)
                await router.push(`/items/${updated.id}`)
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

const EditItemPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditItem />
      </Suspense>

      <p>
        <Link href={`/items`}>Items</Link>
      </p>
    </div>
  )
}

EditItemPage.authenticate = true
EditItemPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditItemPage
