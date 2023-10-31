"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import { CreatePaymentMethodSchema } from "src/payment-methods/schemas"
import createPaymentMethod from "src/payment-methods/mutations/createPaymentMethod"
import { PaymentMethodForm, FORM_ERROR } from "src/payment-methods/components/PaymentMethodForm"

const NewPaymentMethodPage = () => {
  const router = useRouter()
  const [createPaymentMethodMutation] = useMutation(createPaymentMethod)

  return (
    <Layout title={"Create New PaymentMethod"}>
      <h1>Create New PaymentMethod</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentMethodForm
          submitText="Create PaymentMethod"
          schema={CreatePaymentMethodSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const paymentMethod = await createPaymentMethodMutation(values)
              await router.push(`/payment-methods/${paymentMethod.id}`)
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
        <Link href={`/payment-methods`}>PaymentMethods</Link>
      </p>
    </Layout>
  )
}

NewPaymentMethodPage.authenticate = true

export default NewPaymentMethodPage
