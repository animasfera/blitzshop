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
import { useMutation, useQuery } from "@blitzjs/rpc"
import { CreateShippingAddressSchema } from "../../shipping-addresses/schemas"
import { ShippingAddressChoiceController } from "./ShippingAddressChoiceController"
import { ShippingMethodChoiceController } from "./ShippingMethodChoiceController"
import { ShippingMethodWithPrice } from "../../shipping-methods/schemas"
import getShippingMethodWithPrice from "../../shipping-methods/queries/getShippingMethodWithPrice"
import { PaymentMethodChoiceController } from "./PaymentMethodChoiceController"
import createOrder from "../../orders/mutations/createOrder"
import useScript from "../../core/hooks/useScript"
import { StripeCheckoutForm } from "src/core/stripe/components/StripeCheckoutForm"

interface CheckoutProps {
  cartClient: cartClient
}

export const Checkout = (props: CheckoutProps) => {
  const { cartClient } = props

  const [cpScriptLoaded, setCpScriptLoaded] = useState(false)
  useScript("https://widget.cloudpayments.ru/bundles/cloudpayments.js", () => {
    setCpScriptLoaded(true)
  })

  const { t, i18n } = useTranslation(["pages.checkout", "shippingAddress"])
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null)
  const [shippingMethod, setShippingMethod] = useState<ShippingMethodWithPrice | null>(null)
  const [shippingMethodWithPrice] = useQuery(
    getShippingMethodWithPrice,
    { address: shippingAddress! },
    { enabled: shippingAddress !== null }
  )

  const [createOrderMutation] = useMutation(createOrder)

  const [step, setStep] = useState<"address" | "shippingMethod" | "payment">("address")
  const [paymentCurrency, setPaymentCurrency] = useState<CurrencyEnum>(CurrencyEnum.RUB)

  useEffect(() => {
    if (step === "shippingMethod" && shippingAddress) {
      if (["ru", "by", "kz"].includes(shippingAddress.countryId)) {
      }
    }
  }, [step])

  const shipping = 100

  const initPayment = async () => {
    // const order = await createOrderMutation({})

    switch (paymentCurrency) {
      case CurrencyEnum.RUB:
        // TODO do Cloudpayments payment with order.invoiceId
        break
      case CurrencyEnum.EUR:
        // TODO do Stripe payment with order.invoiceId
        break
    }
  }

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
              <ShippingAddressChoiceController
                onSelect={(address) => {
                  setShippingAddress(address)
                  setStep("payment")
                }}
              />
            </CheckoutPaymentFormInputsBlock>
          )}
          {step === "shippingMethod" && shippingAddress && (
            <>
              <CheckoutPaymentFormInputsBlock title={t("shippingMethod:title")}>
                <ShippingMethodChoiceController
                  address={shippingAddress}
                  onSelect={(shippingMethod) => {
                    setShippingMethod(shippingMethod)
                  }}
                />
              </CheckoutPaymentFormInputsBlock>
            </>
          )}
          {step === "paymentCurrency" && shippingMethodWithPrice && (
            <>
              <CheckoutPaymentFormInputsBlock title={t("shippingMethod:title")}>
                <PaymentMethodChoiceController
                  onSubmit={async (values) => {
                    setPaymentCurrency(values.currency)
                    await initPayment()
                  }}
                />
              </CheckoutPaymentFormInputsBlock>
            </>
          )}
          {step === "payment" && shippingMethodWithPrice && (
            <>
              <Elements options={options} stripe={stripePromise}>
                <StripeCheckoutForm booking={bookingDetails.booking} />
              </Elements>
            </>
          )}
        </CheckoutPayment>
      </div>
    </div>
  )
}

export default Checkout
