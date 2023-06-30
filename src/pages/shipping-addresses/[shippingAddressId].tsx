import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getShippingAddress from "src/shipping-addresses/queries/getShippingAddress"
import deleteShippingAddress from "src/shipping-addresses/mutations/deleteShippingAddress"

export const ShippingAddress = () => {
  const router = useRouter()
  const shippingAddressId = useParam("shippingAddressId", "number")
  const [deleteShippingAddressMutation] = useMutation(deleteShippingAddress)
  const [shippingAddress] = useQuery(getShippingAddress, {
    id: shippingAddressId,
  })

  return (
    <>
      <Head>
        <title>ShippingAddress {shippingAddress.id}</title>
      </Head>

      <div>
        <h1>ShippingAddress {shippingAddress.id}</h1>
        <pre>{JSON.stringify(shippingAddress, null, 2)}</pre>

        <Link
          href={Routes.EditShippingAddressPage({
            shippingAddressId: shippingAddress.id,
          })}
        >
          Edit
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteShippingAddressMutation({ id: shippingAddress.id })
              await router.push(Routes.ShippingAddressesPage())
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
        <Link href={Routes.ShippingAddressesPage()}>ShippingAddresses</Link>
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
