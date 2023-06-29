import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getCart from "src/carts/queries/getCart"
import deleteCart from "src/carts/mutations/deleteCart"

export const Cart = () => {
  const router = useRouter()
  const cartId = useParam("cartId", "number")
  const [deleteCartMutation] = useMutation(deleteCart)
  const [cart] = useQuery(getCart, { id: cartId })

  return (
    <>
      <Head>
        <title>Cart {cart.id}</title>
      </Head>

      <div>
        <h1>Cart {cart.id}</h1>
        <pre>{JSON.stringify(cart, null, 2)}</pre>

        <Link href={Routes.EditCartPage({ cartId: cart.id })}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteCartMutation({ id: cart.id })
              await router.push(Routes.CartsPage())
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

const ShowCartPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.CartsPage()}>Carts</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Cart />
      </Suspense>
    </div>
  )
}

ShowCartPage.authenticate = true
ShowCartPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowCartPage
