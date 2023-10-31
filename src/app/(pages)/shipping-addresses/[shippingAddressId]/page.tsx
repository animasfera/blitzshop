"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import getShippingAddress from "src/shipping-addresses/queries/getShippingAddress"
import deleteShippingAddress from "src/shipping-addresses/mutations/deleteShippingAddress"

const ShippingAddress = () => {
  const router = useRouter()
  const shippingAddressId: number = parseInt((useParams()?.shippingAddressId as any) || "-1")
  const [deleteShippingAddressMutation] = useMutation(deleteShippingAddress)
  const [shippingAddress] = useQuery(getShippingAddress, {
    id: shippingAddressId,
  })

  return (
    <>
      <title>ShippingAddress {shippingAddress.id}</title>

      <div>
        <h1>ShippingAddress {shippingAddress.id}</h1>
        <pre>{JSON.stringify(shippingAddress, null, 2)}</pre>

        <Link href={`/shipping-addresses/${shippingAddress.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteShippingAddressMutation({ id: shippingAddress.id })
              await router.push(`/shipping-addresses`)
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

const ShowShippingAddressPage = () => {
  return (
    <div>
      <p>
        <Link href={`/shipping-addresses`}>ShippingAddresses</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <ShippingAddress />
      </Suspense>
    </div>
  )
}

ShowShippingAddressPage.authenticate = true
ShowShippingAddressPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowShippingAddressPage
