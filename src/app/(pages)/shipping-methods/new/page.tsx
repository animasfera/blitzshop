"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import { CreateShippingMethodSchema } from "src/shipping-methods/schemas"
import createShippingMethod from "src/shipping-methods/mutations/createShippingMethod"
import { ShippingMethodForm, FORM_ERROR } from "src/shipping-methods/components/ShippingMethodForm"

const NewShippingMethodPage = () => {
  const router = useRouter()
  const [createShippingMethodMutation] = useMutation(createShippingMethod)

  return (
    <Layout title={"Create New ShippingMethod"}>
      <h1>Create New ShippingMethod</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ShippingMethodForm
          submitText="Create ShippingMethod"
          schema={CreateShippingMethodSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const shippingMethod = await createShippingMethodMutation(values)
              await router.push(`/shipping-methods/${shippingMethod.id}`)
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
        <Link href={`/shipping-methods`}>ShippingMethods</Link>
      </p>
    </Layout>
  )
}

NewShippingMethodPage.authenticate = true

export default NewShippingMethodPage
