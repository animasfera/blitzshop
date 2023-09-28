import { useTranslation } from "react-i18next"
import { useSession } from "@blitzjs/auth"
import Layout from "../../core/layouts/Layout"
import React from "react"
import { CartController } from "src/carts/components/CartController"

const CartPage = (props) => {
  const { t } = useTranslation()

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {t("cart:header")}
      </h1>

      {/*<Loading>{session.userId && <CartController userId={session.userId} />}</Loading>*/}
    </>
  )
}

CartPage.getLayout = (page) => <Layout title={"CartPage"}>{page}</Layout>
export default CartPage
