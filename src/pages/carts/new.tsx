import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import { CreateCartSchema } from "src/carts/schemas"
import createCart from "src/carts/mutations/createCart"
import { CartForm, FORM_ERROR } from "src/carts/components/CartForm"
import { Suspense } from "react"

const NewCartPage = () => {
  const router = useRouter()
  const [createCartMutation] = useMutation(createCart)

  return (
    <Layout title={"Create New Cart"}>
      <h1>Create New Cart</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <CartForm
          submitText="Create Cart"
          schema={CreateCartSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const cart = await createCartMutation(values)
              await router.push(Routes.ShowCartPage({ cartId: cart.id }))
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
        <Link href={Routes.CartsPage()}>Carts</Link>
      </p>
    </Layout>
  )
}

NewCartPage.authenticate = true

export default NewCartPage
