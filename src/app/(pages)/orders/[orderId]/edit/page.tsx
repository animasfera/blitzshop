"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import { UpdateOrderSchema } from "src/orders/schemas"
import { OrderForm, FORM_ERROR } from "src/orders/components/OrderForm"
import getOrder from "src/orders/queries/getOrder"
import updateOrder from "src/orders/mutations/updateOrder"

const EditOrder = () => {
  const router = useRouter()
  const orderId: number = parseInt((useParams()?.orderId as any) || "-1")
  const [order, { setQueryData }] = useQuery(
    getOrder,
    { id: orderId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateOrderMutation] = useMutation(updateOrder)

  return (
    <>
      <title>Edit Order {order.id}</title>

      <div>
        <h1>Edit Order {order.id}</h1>
        <pre>{JSON.stringify(order, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <OrderForm
            submitText="Update Order"
            schema={UpdateOrderSchema}
            initialValues={order}
            onSubmit={async (values) => {
              try {
                const updated = await updateOrderMutation({
                  id: order.id,
                  // ...values,
                })
                // TODO: убрать, когда будет делаться страница
                // @ts-ignore
                await setQueryData(updated)
                await router.push(`/orders/${updated.id}`)
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

const EditOrderPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditOrder />
      </Suspense>

      <p>
        <Link href={`/orders`}>Orders</Link>
      </p>
    </div>
  )
}

EditOrderPage.authenticate = true
EditOrderPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditOrderPage
