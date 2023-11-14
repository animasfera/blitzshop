import React, { useEffect, useState } from "react"
import { useMutation } from "@blitzjs/rpc"
import { CurrencyEnum, Invoice, ShippingAddress } from "@prisma/client"
import { useTranslation } from "react-i18next"
import { z } from "zod"

import { PreOrderItem } from "src/../types"
import { CheckoutOrder } from "src/checkout/components/CheckoutOrder"
import { CheckoutDeliveryMethod } from "src/checkout/components/CheckoutDeliveryMethod"
import { CheckoutPayment } from "src/checkout/components/CheckoutPayment"
import { cartClient } from "src/core/hooks/useCart"
import createOrder from "src/orders/mutations/createOrder"
import { StripeCheckoutFormWithElements, useStripe } from "src/core/hooks/useStripe"
import CheckoutPaymentFormInputsBlock from "./CheckoutPaymentFormInputsBlock"
import { ShippingAddressChoiceController } from "./ShippingAddressChoiceController"
import getShippingMethodWithPrice from "src/shipping-methods/mutations/getShippingMethodWithPrice"
import { OrderWithItemsAndUserAndInvoice, useCloudpayments } from "src/core/hooks/useCloudpayments"
import { CreateOrderType } from "src/orders/schemas"
import PaymentCurrencyForm from "./PaymentCurrencyForm"
import { usePayment } from "../../core/hooks/usePayment"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"

interface CheckoutProps {
  items: any[]
  cartClient: cartClient
  // deliveryMethods: { value: 1 | 2; label: string }[]
  // deliveryMethod: { value: 1 | 2; label: string }
  // countries: { value: string; label: string; img: string }[]
  // country?: { value: string; label: string; img: string }
  // regions: { value: number | string; label: string }[]
  // region?: { value: number | string; label: string }
  // cities: { value: number | string; label: string }[]
  // city?: { value: number | string; label: string }
  // postalCodes: { value: string; label: string }[]
  // selectedPostalCode?: { value: string; label: string }
  //
  // handleDeliveryMethod: (el: { value: 1 | 2; label: string }) => void
  // handleCountry: (el: { value: string; label: string; img: string }) => void
  // handleRegion: (el: { value: number | string; label: string }) => void
  // handleCity: (el: { value: number | string; label: string }) => void
  // handlePostalCodes: (el: { value: string; label: string }) => void
}

export const Checkout = (props: CheckoutProps) => {
  const { cartClient } = props

  const { t } = useTranslation(["pages.checkout", "shippingAddress"])
  const { pay, stripePaymentIntent } = usePayment()
  const router = useRouter()

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
            <>
              <ShippingAddressChoiceController
                shippingAddress={shippingAddress}
                onSelect={async (address) => {
                  setShippingAddress(address)
                  // const shippingWithPrice = await getShippingMethodWithPriceMutation({
                  //   address,
                  // })
                  // setOrder({
                  //   ...order,
                  //   shippingFee: shippingWithPrice.price,
                  // })
                }}
              />
            </>
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
                      router.push(Routes.OrderPage({ orderId: orderCreated.id }))
                      // setOrder(orderCreated)
                      // TODO платежи тут пока не делаем, оплата будет на странице заказа
                      // await pay(orderCreated)
                    }
                  }}
                />
              </CheckoutPaymentFormInputsBlock>
              {/*{stripePaymentIntent &&*/}
              {/*  order.id &&*/}
              {/*  order.invoice &&*/}
              {/*  order.invoice.currency === CurrencyEnum.EUR && (*/}
              {/*    <StripeCheckoutFormWithElements*/}
              {/*      orderId={order.id}*/}
              {/*      paymentIntentInstance={stripePaymentIntent}*/}
              {/*    />*/}
              {/*  )}*/}
            </>
          )}
        </CheckoutPayment>
      </div>
    </div>
  )
}

export default Checkout
