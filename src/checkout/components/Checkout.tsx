import React, { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { CheckoutOrder } from "src/checkout/components/CheckoutOrder"
import { CheckoutPayment } from "src/checkout/components/CheckoutPayment"
import { cartClient } from "../../core/hooks/useCart"
import { CurrencyEnum, Invoice, PaymentMethod, ShippingAddress } from "@prisma/client"
import CheckoutPaymentFormInputsBlock from "./CheckoutPaymentFormInputsBlock"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { ShippingAddressChoiceController } from "./ShippingAddressChoiceController"
import { ShippingMethodChoiceController } from "./ShippingMethodChoiceController"
import { ShippingMethodWithPrice } from "../../shipping-methods/schemas"
import getShippingMethodWithPrice from "../../shipping-methods/mutations/getShippingMethodWithPrice"
import { PaymentCountryChoiceController } from "./PaymentCountryChoiceController"
import createOrder from "../../orders/mutations/createOrder"
import { StripeCheckoutFormWithElements, useStripe } from "../../core/hooks/useStripe"
import {
  OrderWithItemsAndUserAndInvoice,
  useCloudpayments,
} from "../../core/hooks/useCloudpayments"
import { CreateOrderType } from "../../orders/schemas"

interface CheckoutProps {
  cartClient: cartClient
}

export const Checkout = (props: CheckoutProps) => {
  const { cartClient } = props

  const stripe = useStripe()
  const cloudpayments = useCloudpayments()

  const { t, i18n } = useTranslation(["pages.checkout", "shippingAddress"])
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null)
  const [shippingMethod, setShippingMethod] = useState<ShippingMethodWithPrice | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "cloudpayments" | undefined>()
  const [getShippingMethodWithPriceMutation] = useMutation(getShippingMethodWithPrice)
  const [order, setOrder] = useState<{
    id?: number
    items: { itemId: number; qty: number; price: number }[]
    shippingFee?: number
    subtotal: number
    total: number
    paymentMethodId?: number
    invoices?: (Invoice & { paymentMethod: PaymentMethod })[]
  }>({
    items: cartClient.getItems().map((item) => {
      return {
        itemId: item.itemId,
        qty: item.qty,
        price: item.item.price,
      }
    }),
    subtotal: cartClient.getTotal(),
    total: cartClient.getTotal(),
    shippingFee: 0,
  })

  const [createOrderMutation] = useMutation(createOrder)

  const [step, setStep] = useState<"address" | "shippingMethod" | "paymentCountry" | "payment">(
    "address"
  )
  const [paymentCurrency, setPaymentCurrency] = useState<CurrencyEnum>(CurrencyEnum.RUB)

  useEffect(() => {
    if (step === "shippingMethod" && shippingAddress) {
      if (["ru", "by", "kz"].includes(shippingAddress.countryId)) {
      }
    }
  }, [step])

  const shipping = 100

  const [stripePayment, setStripePayment] = useState<any>()

  const initPayment = async (order: OrderWithItemsAndUserAndInvoice) => {
    if (!order.invoices[0]) {
      return false
    }
    alert(order.invoices[0].paymentMethod.name)
    switch (order.invoices[0].paymentMethod.name) {
      case "cloudpayments":
        cloudpayments.pay(order)
        break
      case "stripe":
        const paymentIntent = await stripe.pay(order)
        setStripePayment(paymentIntent)
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
                onSelect={async (address) => {
                  setShippingAddress(address)
                  const shippingWithPrice = await getShippingMethodWithPriceMutation({
                    address,
                  })
                  setOrder({
                    ...order,
                    shippingFee: shippingWithPrice.price,
                  })
                  setStep("paymentCountry")
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
          {step === "paymentCountry" && (
            <>
              <CheckoutPaymentFormInputsBlock title={t("shippingMethod:title")}>
                <PaymentCountryChoiceController
                  onSubmit={async (values) => {
                    console.log("pm ID")
                    console.log(values.paymentMethodId)
                    let newOrderData = {
                      ...order,
                      paymentMethodId: values.paymentMethodId,
                    }

                    if (
                      typeof newOrderData.paymentMethodId !== "undefined" &&
                      newOrderData.shippingFee
                    ) {
                      const orderCreated = await createOrderMutation(
                        newOrderData as CreateOrderType
                      )
                      setOrder(orderCreated)
                      await initPayment(orderCreated)
                    }
                  }}
                />
              </CheckoutPaymentFormInputsBlock>
              {order.id && order.invoices && order.invoices[0]?.paymentMethod.name === "stripe" && (
                // <stripe.CheckoutForm orderId={order.id} />
                <StripeCheckoutFormWithElements
                  orderId={order.id}
                  paymentIntentInstance={stripePayment}
                />
              )}
            </>
          )}
        </CheckoutPayment>
      </div>
    </div>
  )
}

export default Checkout
