"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import { UpdatePaymentMethodSchema } from "src/payment-methods/schemas"
import getPaymentMethod from "src/payment-methods/queries/getPaymentMethod"
import updatePaymentMethod from "src/payment-methods/mutations/updatePaymentMethod"
import { PaymentMethodForm, FORM_ERROR } from "src/payment-methods/components/PaymentMethodForm"

const EditPaymentMethod = () => {
  const router = useRouter()
  const paymentMethodId: number = parseInt((useParams()?.paymentMethodId as any) || "-1")
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
      <title>Edit PaymentMethod {paymentMethod.id}</title>

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
                await router.push(`/payment-methods/${updated.id}`)
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
        <Link href={`/payment-methods`}>PaymentMethods</Link>
      </p>
    </div>
  )
}

EditPaymentMethodPage.authenticate = true
EditPaymentMethodPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPaymentMethodPage
