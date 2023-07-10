import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import { CreateItemToRefundSchema } from "src/item-to-refunds/schemas"
import createItemToRefund from "src/item-to-refunds/mutations/createItemToRefund"
import { ItemToRefundForm, FORM_ERROR } from "src/item-to-refunds/components/ItemToRefundForm"

const NewItemToRefundPage = () => {
  const router = useRouter()
  const [createItemToRefundMutation] = useMutation(createItemToRefund)

  return (
    <Layout title={"Create New ItemToRefund"}>
      <h1>Create New ItemToRefund</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ItemToRefundForm
          submitText="Create ItemToRefund"
          schema={CreateItemToRefundSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const itemToRefund = await createItemToRefundMutation(values)
              await router.push(Routes.ShowItemToRefundPage({ itemToRefundId: itemToRefund.id }))
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
        <Link href={Routes.ItemToRefundsPage()}>ItemToRefunds</Link>
      </p>
    </Layout>
  )
}

NewItemToRefundPage.authenticate = true

export default NewItemToRefundPage
