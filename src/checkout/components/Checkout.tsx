import React, { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { CheckoutOrder } from "src/checkout/components/CheckoutOrder"
import { CheckoutPayment } from "src/checkout/components/CheckoutPayment"
import { cartClient } from "../../core/hooks/useCart"
import { CurrencyEnum, Invoice, ShippingAddress } from "@prisma/client"
import CheckoutPaymentFormInputsBlock from "./CheckoutPaymentFormInputsBlock"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { ShippingAddressChoiceController } from "./ShippingAddressChoiceController"
import getShippingMethodWithPrice from "../../shipping-methods/mutations/getShippingMethodWithPrice"
import createOrder from "../../orders/mutations/createOrder"
import { StripeCheckoutFormWithElements, useStripe } from "../../core/hooks/useStripe"
import {
  OrderWithItemsAndUserAndInvoice,
  useCloudpayments,
} from "../../core/hooks/useCloudpayments"
import { CreateOrderType } from "../../orders/schemas"
import PaymentCurrencyForm from "./PaymentCurrencyForm"
import { z } from "zod"
import { PreOrderItem } from "../../../types"

interface CheckoutProps {
  cartClient: cartClient
}

export const Checkout = (props: CheckoutProps) => {
  const { cartClient } = props

  const stripe = useStripe()
  const cloudpayments = useCloudpayments()

  const { t } = useTranslation(["pages.checkout", "shippingAddress"])
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | undefined>()
  const [getShippingMethodWithPriceMutation] = useMutation(getShippingMethodWithPrice)
  const [order, setOrder] = useState<{
    id?: number
    items: PreOrderItem[]
    shippingFee?: number
    subtotal: number
    total: number
    paymentMethodId?: number
    invoice?: Invoice
  }>({
    items: cartClient.getItems().map((item) => {
      return {
        title: item.item.title,
        imageUrl: item.item.images[0]?.image.url || "",
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

  useEffect(() => {
    if (step === "shippingMethod" && shippingAddress) {
      if (["ru", "by", "kz"].includes(shippingAddress.countryId)) {
      }
    }
  }, [step])

  const [stripePayment, setStripePayment] = useState<any>()

  const initPayment = async (order: OrderWithItemsAndUserAndInvoice) => {
    if (!order.invoice) {
      return false
    }
    switch (order.invoice.currency) {
      case CurrencyEnum.RUB:
        cloudpayments.pay(order)
        break
      case CurrencyEnum.EUR:
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
          items={order.items}
          subtotal={order.subtotal}
          shipping={order.shippingFee}
          total={order.total}
        />

        <CheckoutPayment>
          <CheckoutPaymentFormInputsBlock title={t("shippingAddress:title")}>
            <ShippingAddressChoiceController
              shippingAddress={shippingAddress}
              onSelect={async (address) => {
                setShippingAddress(address)
                const shippingWithPrice = await getShippingMethodWithPriceMutation({
                  address,
                })
                setOrder({
                  ...order,
                  shippingFee: shippingWithPrice.price,
                })
              }}
            />
          </CheckoutPaymentFormInputsBlock>

          {shippingAddress && (
            <>
              <CheckoutPaymentFormInputsBlock title={t("pages.checkout:paymentCurrency.title")}>
                <PaymentCurrencyForm
                  schema={z.object({
                    currency: z.enum(["RUB", "EUR"]),
                  })}
                  submitText={t("translation:next")}
                  onSubmit={async (values) => {
                    let newOrderData = {
                      ...order,
                      currency: values.currency,
                    }

                    if (typeof newOrderData.currency !== "undefined" && newOrderData.shippingFee) {
                      const orderCreated = await createOrderMutation(
                        newOrderData as CreateOrderType
                      )
                      setOrder(orderCreated)
                      await initPayment(orderCreated)
                    }
                  }}
                />
              </CheckoutPaymentFormInputsBlock>
              {order.id && order.invoice && order.invoice.currency === CurrencyEnum.EUR && (
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
