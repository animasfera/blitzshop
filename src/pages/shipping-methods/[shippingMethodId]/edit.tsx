import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import { UpdateShippingMethodSchema } from "src/shipping-methods/schemas"
import getShippingMethod from "src/shipping-methods/queries/getShippingMethod"
import updateShippingMethod from "src/shipping-methods/mutations/updateShippingMethod"
import { ShippingMethodForm, FORM_ERROR } from "src/shipping-methods/components/ShippingMethodForm"

export const EditShippingMethod = () => {
  const router = useRouter()
  const shippingMethodId = useParam("shippingMethodId", "number")
  const [shippingMethod, { setQueryData }] = useQuery(
    getShippingMethod,
    { id: shippingMethodId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateShippingMethodMutation] = useMutation(updateShippingMethod)

  return (
    <>
      <Head>
        <title>Edit ShippingMethod {shippingMethod.id}</title>
      </Head>

      <div>
        <h1>Edit ShippingMethod {shippingMethod.id}</h1>
        <pre>{JSON.stringify(shippingMethod, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <ShippingMethodForm
            submitText="Update ShippingMethod"
            schema={UpdateShippingMethodSchema}
            initialValues={shippingMethod}
            onSubmit={async (values) => {
              try {
                const updated = await updateShippingMethodMutation({
                  id: shippingMethod.id,
                  ...values,
                })
                await setQueryData(updated)
                await router.push(
                  Routes.ShowShippingMethodPage({
                    shippingMethodId: updated.id,
                  })
                )
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

const EditShippingMethodPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditShippingMethod />
      </Suspense>

      <p>
        <Link href={Routes.ShippingMethodsPage()}>ShippingMethods</Link>
      </p>
    </div>
  )
}

EditShippingMethodPage.authenticate = true
EditShippingMethodPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditShippingMethodPage
