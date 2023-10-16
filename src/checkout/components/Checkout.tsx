import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { CheckoutOrder } from "src/checkout/components/CheckoutOrder"
import { CheckoutPayment } from "src/checkout/components/CheckoutPayment"
import { CartItemWithItem } from "../../../types"
import { cartClient } from "../../core/hooks/useCart"
import ShippingAddressForm from "./ShippingAddressForm"
import ShippingMethodForm from "./ShippingMethodForm"
import { CurrencyEnum, ShippingAddress } from "@prisma/client"
import CheckoutPaymentFormInputsBlock from "./CheckoutPaymentFormInputsBlock"
import getShippingMethods from "../../shipping-methods/queries/getShippingMethods"
import { useQuery } from "@blitzjs/rpc"
import { CreateShippingAddressSchema } from "../../shipping-addresses/schemas"

interface CheckoutProps {
  cartClient: cartClient
}

export const Checkout = (props: CheckoutProps) => {
  const { cartClient } = props

  const { t, i18n } = useTranslation(["pages.checkout", "shippingAddress"])
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null)
  const [shippingMethodsCustom, setShippingMethodsCustom] = useState<any>(null)

  const [step, setStep] = useState<"address" | "shippingMethod" | "payment">("address")
  const [{ shippingMethods }] = useQuery(getShippingMethods, {})

  const shippingMethodsLocalized = shippingMethods.map((sm) => {
    return {
      id: sm.id,
      title: i18n.resolvedLanguage === "ru" ? sm.titleRu : sm.titleEn,
      price: 0,
      currency: CurrencyEnum.EUR,
    }
  })

  useEffect(() => {
    if (step === "shippingMethod") {
      if (["ru", "by", "kz"].includes(shippingAddress.countryIsoCode)) {
      }
    }
  }, [step])

  const shipping = 100

  return (
    <div className="bg-white relative">
      <div className="absolute left-0 hidden h-full w-1/2 bg-white xl:block" aria-hidden="true" />
      <div
        className="absolute right-0 hidden h-full w-1/2 bg-indigo-900 xl:block"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 xl:grid-cols-2 xl:px-8 xl:pt-16">
        <h1 className="sr-only">{t("index.title")}</h1>

        <CheckoutOrder
          items={cartClient.getItems()}
          subtotal={cartClient.getTotal()}
          shipping={shipping}
          total={cartClient.getTotal() + shipping}
        />

        <CheckoutPayment>
          {step === "address" && (
            <CheckoutPaymentFormInputsBlock title={t("shippingAddress:title")}>
              <ShippingAddressForm
                submitText={t("shippingAddress:chooseMethod")}
                initialValues={{}}
                schema={CreateShippingAddressSchema}
                onSubmit={(address) => {
                  setShippingAddress(address)
                  setStep("shippingMethod")
                }}
              />
            </CheckoutPaymentFormInputsBlock>
          )}
          {step === "shippingMethod" && (
            <>
              <CheckoutPaymentFormInputsBlock title={t("shippingMethod:title")}>
                <ShippingMethodForm methods={shippingMethodsLocalized} onSubmit={() => {}} />
              </CheckoutPaymentFormInputsBlock>
            </>
          )}
        </CheckoutPayment>
      </div>
    </div>
  )
}

export default Checkout
