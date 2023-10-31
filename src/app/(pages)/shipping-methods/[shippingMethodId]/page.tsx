"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import getShippingMethod from "src/shipping-methods/queries/getShippingMethod"
import deleteShippingMethod from "src/shipping-methods/mutations/deleteShippingMethod"

const ShippingMethod = () => {
  const router = useRouter()
  const shippingMethodId: number = parseInt((useParams()?.shippingMethodId as any) || "-1")
  const [deleteShippingMethodMutation] = useMutation(deleteShippingMethod)
  const [shippingMethod] = useQuery(getShippingMethod, {
    id: shippingMethodId,
  })

  return (
    <>
      <title>ShippingMethod {shippingMethod.id}</title>

      <div>
        <h1>ShippingMethod {shippingMethod.id}</h1>
        <pre>{JSON.stringify(shippingMethod, null, 2)}</pre>

        <Link href={`/shipping-methods/${shippingMethod.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteShippingMethodMutation({ id: shippingMethod.id })
              await router.push(`/shipping-methods`)
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

const ShowShippingMethodPage = () => {
  return (
    <div>
      <p>
        <Link href={`/shipping-methods`}>ShippingMethods</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <ShippingMethod />
      </Suspense>
    </div>
  )
}

ShowShippingMethodPage.authenticate = true
ShowShippingMethodPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowShippingMethodPage
