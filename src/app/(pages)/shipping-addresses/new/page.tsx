"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import { CreateShippingAddressSchema } from "src/shipping-addresses/schemas"
import createShippingAddress from "src/shipping-addresses/mutations/createShippingAddress"
import {
  ShippingAddressForm,
  FORM_ERROR,
} from "src/shipping-addresses/components/ShippingAddressForm"

const NewShippingAddressPage = () => {
  const router = useRouter()
  const [createShippingAddressMutation] = useMutation(createShippingAddress)

  return (
    <Layout title={"Create New ShippingAddress"}>
      <h1>Create New ShippingAddress</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ShippingAddressForm
          submitText="Create ShippingAddress"
          schema={CreateShippingAddressSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const shippingAddress = await createShippingAddressMutation(values)
              await router.push(`/shipping-addresses/${shippingAddress.id}`)
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
        <Link href={`/shipping-addresses`}>ShippingAddresses</Link>
      </p>
    </Layout>
  )
}

NewShippingAddressPage.authenticate = true

export default NewShippingAddressPage
