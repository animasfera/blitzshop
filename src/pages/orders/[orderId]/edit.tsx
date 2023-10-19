"use client"
import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import { UpdateOrderSchema } from "src/orders/schemas"
import getOrder from "src/orders/queries/getOrder"
import updateOrder from "src/orders/mutations/updateOrder"
import { OrderForm, FORM_ERROR } from "src/orders/components/OrderForm"

export const EditOrder = () => {
  const router = useRouter()
  const orderId = useParam("orderId", "number")
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
      <Head>
        <title>Edit Order {order.id}</title>
      </Head>

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
                await setQueryData(updated)
                await router.push(Routes.OrderPage({ orderId: updated.id }))
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
        <Link href={Routes.OrdersPage()}>Orders</Link>
      </p>
    </div>
  )
}

EditOrderPage.authenticate = true
EditOrderPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditOrderPage
