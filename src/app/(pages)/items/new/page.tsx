"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import { CreateItemSchema } from "src/items/schemas"
import createItem from "src/items/mutations/createItem"
import { ItemForm } from "src/items/components/ItemForm"
import { FORM_ERROR } from "src/core/components/form/Form"

const NewItemPage = () => {
  const router = useRouter()
  const [createItemMutation] = useMutation(createItem)

  return (
    <Layout title={"Create New Item"}>
      <h1>Create New Item</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ItemForm
          submitText="Create Item"
          schema={CreateItemSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const item = await createItemMutation(values)
              await router.push(`/items/${item.id}`)
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
        <Link href={`/items`}>Items</Link>
      </p>
    </Layout>
  )
}

NewItemPage.authenticate = true

export default NewItemPage
