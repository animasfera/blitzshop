import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import { UpdateItemToRefundSchema } from "src/item-to-refunds/schemas"
import getItemToRefund from "src/item-to-refunds/queries/getItemToRefund"
import updateItemToRefund from "src/item-to-refunds/mutations/updateItemToRefund"
import { ItemToRefundForm, FORM_ERROR } from "src/item-to-refunds/components/ItemToRefundForm"

export const EditItemToRefund = () => {
  const router = useRouter()
  const itemToRefundId = useParam("itemToRefundId", "number")
  const [itemToRefund, { setQueryData }] = useQuery(
    getItemToRefund,
    { id: itemToRefundId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateItemToRefundMutation] = useMutation(updateItemToRefund)

  return (
    <>
      <Head>
        <title>Edit ItemToRefund {itemToRefund.id}</title>
      </Head>

      <div>
        <h1>Edit ItemToRefund {itemToRefund.id}</h1>
        <pre>{JSON.stringify(itemToRefund, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <ItemToRefundForm
            submitText="Update ItemToRefund"
            schema={UpdateItemToRefundSchema}
            initialValues={itemToRefund}
            onSubmit={async (values) => {
              try {
                const updated = await updateItemToRefundMutation({
                  id: itemToRefund.id,
                  // ...values,
                })
                await setQueryData(updated)
                await router.push(Routes.ShowItemToRefundPage({ itemToRefundId: updated.id }))
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

const EditItemToRefundPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditItemToRefund />
      </Suspense>

      <p>
        <Link href={Routes.ItemToRefundsPage()}>ItemToRefunds</Link>
      </p>
    </div>
  )
}

EditItemToRefundPage.authenticate = true
EditItemToRefundPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditItemToRefundPage
