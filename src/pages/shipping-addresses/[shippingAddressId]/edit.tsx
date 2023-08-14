"use client"
import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import { UpdateShippingAddressSchema } from "src/shipping-addresses/schemas"
import getShippingAddress from "src/shipping-addresses/queries/getShippingAddress"
import updateShippingAddress from "src/shipping-addresses/mutations/updateShippingAddress"
import {
  ShippingAddressForm,
  FORM_ERROR,
} from "src/shipping-addresses/components/ShippingAddressForm"

export const EditShippingAddress = () => {
  const router = useRouter()
  const shippingAddressId = useParam("shippingAddressId", "number")
  const [shippingAddress, { setQueryData }] = useQuery(
    getShippingAddress,
    { id: shippingAddressId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateShippingAddressMutation] = useMutation(updateShippingAddress)

  return (
    <>
      <Head>
        <title>Edit ShippingAddress {shippingAddress.id}</title>
      </Head>

      <div>
        <h1>Edit ShippingAddress {shippingAddress.id}</h1>
        <pre>{JSON.stringify(shippingAddress, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <ShippingAddressForm
            submitText="Update ShippingAddress"
            schema={UpdateShippingAddressSchema}
            initialValues={shippingAddress}
            onSubmit={async (values) => {
              try {
                const updated = await updateShippingAddressMutation({
                  id: shippingAddress.id,
                  // ...values,
                })
                await setQueryData(updated)
                await router.push(
                  Routes.ShowShippingAddressPage({
                    shippingAddressId: updated.id,
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

const EditShippingAddressPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditShippingAddress />
      </Suspense>

      <p>
        <Link href={Routes.ShippingAddressesPage()}>ShippingAddresses</Link>
      </p>
    </div>
  )
}

EditShippingAddressPage.authenticate = true
EditShippingAddressPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditShippingAddressPage
