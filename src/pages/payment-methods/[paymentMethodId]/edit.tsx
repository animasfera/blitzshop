"use client"
import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import { UpdatePaymentMethodSchema } from "src/payment-methods/schemas"
import getPaymentMethod from "src/payment-methods/queries/getPaymentMethod"
import updatePaymentMethod from "src/payment-methods/mutations/updatePaymentMethod"
import { PaymentMethodForm, FORM_ERROR } from "src/payment-methods/components/PaymentMethodForm"

export const EditPaymentMethod = () => {
  const router = useRouter()
  const paymentMethodId = useParam("paymentMethodId", "number")
  const [paymentMethod, { setQueryData }] = useQuery(
    getPaymentMethod,
    { id: paymentMethodId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updatePaymentMethodMutation] = useMutation(updatePaymentMethod)

  return (
    <>
      <Head>
        <title>Edit PaymentMethod {paymentMethod.id}</title>
      </Head>

      <div>
        <h1>Edit PaymentMethod {paymentMethod.id}</h1>
        <pre>{JSON.stringify(paymentMethod, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <PaymentMethodForm
            submitText="Update PaymentMethod"
            schema={UpdatePaymentMethodSchema}
            initialValues={paymentMethod}
            onSubmit={async (values) => {
              try {
                const updated = await updatePaymentMethodMutation({
                  id: paymentMethod.id,
                  // ...values,
                })
                await setQueryData(updated)
                await router.push(Routes.ShowPaymentMethodPage({ paymentMethodId: updated.id }))
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

const EditPaymentMethodPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPaymentMethod />
      </Suspense>

      <p>
        <Link href={Routes.PaymentMethodsPage()}>PaymentMethods</Link>
      </p>
    </div>
  )
}

EditPaymentMethodPage.authenticate = true
EditPaymentMethodPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPaymentMethodPage
