"use client"
import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import { UpdateCartSchema } from "src/carts/schemas"
import getCart from "src/carts/queries/getCart"
import updateCart from "src/carts/mutations/updateCart"
import { CartForm, FORM_ERROR } from "src/carts/components/CartForm"

export const EditCart = () => {
  const router = useRouter()
  const cartId = useParam("cartId", "number")
  const [cart, { setQueryData }] = useQuery(
    getCart,
    { id: cartId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateCartMutation] = useMutation(updateCart)

  return (
    <>
      <Head>
        <title>Edit Cart {cart.id}</title>
      </Head>

      <div>
        <h1>Edit Cart {cart.id}</h1>
        <pre>{JSON.stringify(cart, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <CartForm
            submitText="Update Cart"
            schema={UpdateCartSchema}
            initialValues={cart}
            onSubmit={async (values) => {
              try {
                const updated = await updateCartMutation({
                  id: cart.id,
                  // ...values,
                })
                await setQueryData(updated)
                await router.push(Routes.ShowCartPage({ cartId: updated.id }))
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

const EditCartPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCart />
      </Suspense>

      <p>
        <Link href={Routes.CartsPage()}>Carts</Link>
      </p>
    </div>
  )
}

EditCartPage.authenticate = true
EditCartPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditCartPage
