import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import { CreateOrderSchema } from "src/orders/schemas"
import createOrder from "src/orders/mutations/createOrder"
import { OrderForm, FORM_ERROR } from "src/orders/components/OrderForm"
import { Suspense } from "react"

const NewOrderPage = () => {
  const router = useRouter()
  const [createOrderMutation] = useMutation(createOrder)

  return (
    <Layout title={"Create New Order"}>
      <h1>Create New Order</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <OrderForm
          submitText="Create Order"
          schema={CreateOrderSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const order = await createOrderMutation(values)
              await router.push(Routes.ShowOrderPage({ orderId: order.id }))
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
        <Link href={Routes.OrdersPage()}>Orders</Link>
      </p>
    </Layout>
  )
}

NewOrderPage.authenticate = true

export default NewOrderPage
