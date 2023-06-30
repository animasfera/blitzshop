import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getPaymentMethod from "src/payment-methods/queries/getPaymentMethod"
import deletePaymentMethod from "src/payment-methods/mutations/deletePaymentMethod"

export const PaymentMethod = () => {
  const router = useRouter()
  const paymentMethodId = useParam("paymentMethodId", "number")
  const [deletePaymentMethodMutation] = useMutation(deletePaymentMethod)
  const [paymentMethod] = useQuery(getPaymentMethod, { id: paymentMethodId })

  return (
    <>
      <Head>
        <title>PaymentMethod {paymentMethod.id}</title>
      </Head>

      <div>
        <h1>PaymentMethod {paymentMethod.id}</h1>
        <pre>{JSON.stringify(paymentMethod, null, 2)}</pre>

        <Link
          href={Routes.EditPaymentMethodPage({
            paymentMethodId: paymentMethod.id,
          })}
        >
          Edit
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deletePaymentMethodMutation({ id: paymentMethod.id })
              await router.push(Routes.PaymentMethodsPage())
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
        <Link href={Routes.PaymentMethodsPage()}>PaymentMethods</Link>
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
