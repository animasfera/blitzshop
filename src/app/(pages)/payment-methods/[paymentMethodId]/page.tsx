"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import getPaymentMethod from "src/payment-methods/queries/getPaymentMethod"
import deletePaymentMethod from "src/payment-methods/mutations/deletePaymentMethod"

const PaymentMethod = () => {
  const router = useRouter()
  const paymentMethodId: number = parseInt((useParams()?.categoryId as any) || "-1")
  const [deletePaymentMethodMutation] = useMutation(deletePaymentMethod)
  const [paymentMethod] = useQuery(getPaymentMethod, { id: paymentMethodId })

  return (
    <>
      <title>PaymentMethod {paymentMethod.id}</title>

      <div>
        <h1>PaymentMethod {paymentMethod.id}</h1>
        <pre>{JSON.stringify(paymentMethod, null, 2)}</pre>

        <Link href={`/payment-methods/${paymentMethod.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deletePaymentMethodMutation({ id: paymentMethod.id })
              await router.push(`/payment-methods`)
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowPaymentMethodPage = () => {
  return (
    <div>
      <p>
        <Link href={`/payment-methods`}>PaymentMethods</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <PaymentMethod />
      </Suspense>
    </div>
  )
}

ShowPaymentMethodPage.authenticate = true
ShowPaymentMethodPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPaymentMethodPage
