"use client"
import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getShippingMethod from "src/shipping-methods/queries/getShippingMethod"
import deleteShippingMethod from "src/shipping-methods/mutations/deleteShippingMethod"

export const ShippingMethod = () => {
  const router = useRouter()
  const shippingMethodId = useParam("shippingMethodId", "number")
  const [deleteShippingMethodMutation] = useMutation(deleteShippingMethod)
  const [shippingMethod] = useQuery(getShippingMethod, {
    id: shippingMethodId,
  })

  return (
    <>
      <Head>
        <title>ShippingMethod {shippingMethod.id}</title>
      </Head>

      <div>
        <h1>ShippingMethod {shippingMethod.id}</h1>
        <pre>{JSON.stringify(shippingMethod, null, 2)}</pre>

        <Link
          href={Routes.EditShippingMethodPage({
            shippingMethodId: shippingMethod.id,
          })}
        >
          Edit
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteShippingMethodMutation({ id: shippingMethod.id })
              await router.push(Routes.ShippingMethodsPage())
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
        <Link href={Routes.ShippingMethodsPage()}>ShippingMethods</Link>
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
