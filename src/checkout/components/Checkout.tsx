import React, { useState } from "react"
import { useMutation } from "@blitzjs/rpc"
import { Invoice, ShippingAddress } from "@prisma/client"
import { useTranslation } from "react-i18next"

import { PreOrderItem } from "src/../types"
import { CheckoutOrder } from "src/checkout/components/CheckoutOrder"
import { CheckoutPayment } from "src/checkout/components/CheckoutPayment"
import { cartClient } from "src/core/hooks/useCart"
import createOrder from "src/orders/mutations/createOrder"
import CheckoutPaymentFormInputsBlock from "./CheckoutPaymentFormInputsBlock"
import { ShippingAddressChoiceController } from "./ShippingAddressChoiceController"
import { CreateOrderType } from "src/orders/schemas"
import PaymentCurrencyForm from "./PaymentCurrencyForm"
import { usePayment } from "../../core/hooks/usePayment"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import createInvoiceForOrder from "../../invoices/mutations/createInvoiceForOrder"

interface CheckoutProps {
  items: any[]
  cartClient: cartClient
}

export const Checkout = (props: CheckoutProps) => {
  const { cartClient } = props

  const { t } = useTranslation(["pages.checkout", "shippingAddress"])
  // const { pay, stripePaymentIntent } = usePayment()
  const router = useRouter()

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | undefined>()
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
  const [createInvoiceMutation] = useMutation(createInvoiceForOrder)

  const [step, setStep] = useState<"address" | "shippingMethod" | "paymentCountry" | "payment">(
    "address"
  )

  const handleSetOrder = (value?: number) => {
    setOrder({ ...order, shippingFee: value })
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
          total={order.total + (order.shippingFee ?? 0)}
        />
        <CheckoutPayment>
          <CheckoutPaymentFormInputsBlock title={t("shippingAddress:title")}>
            <>
              <ShippingAddressChoiceController
                shippingAddress={shippingAddress}
                onSelect={async (address) => {
                  let newOrderData = {
                    ...order,
                    shippingAddress: address,
                  }

                  const orderCreated = await createOrderMutation(newOrderData as CreateOrderType)
                  // router.push(Routes.OrderPage({ orderId: orderCreated.id }))

                  console.log("orderCreated", orderCreated)

                  setShippingAddress(address)
                  // const shippingWithPrice = await getShippingMethodWithPriceMutation({
                  //   address,
                  // })
                  // setOrder({
                  //   ...order,
                  //   shippingFee: shippingWithPrice.price,
                  // })

                  console.log("ShippingAddressChoiceController newOrderData", newOrderData)
                  console.log("ShippingAddressChoiceController address", address)
                }}
                handleSetOrder={handleSetOrder}
              />
            </>
          </CheckoutPaymentFormInputsBlock>

          {shippingAddress && order.id && (
            <>
              <CheckoutPaymentFormInputsBlock title={t("pages.checkout:paymentCurrency.title")}>
                {/*<PaymentCurrencyForm*/}
                {/*  schema={z.object({*/}
                {/*    currency: z.enum(["RUB", "EUR"]),*/}
                {/*  })}*/}
                {/*  submitText={t("translation:next")}*/}
                {/*  onSubmit={async (values) => {*/}
                {/*    if (!order.id) {*/}
                {/*      return*/}
                {/*    }*/}
                {/*    let newInvoiceData = {*/}
                {/*      orderId: order.id,*/}
                {/*      currency: values.currency,*/}
                {/*    }*/}

                {/*    if (typeof newInvoiceData.currency !== "undefined") {*/}
                {/*      const invoiceCreated = await createInvoiceMutation(newInvoiceData)*/}
                {/*      // router.push(Routes.OrderPage({ orderId: orderCreated.id }))*/}
                {/*      // setOrder(orderCreated)*/}
                {/*      // TODO платежи тут пока не делаем, оплата будет на странице заказа*/}
                {/*      // await pay(orderCreated)*/}
                {/*    }*/}
                {/*  }}*/}
                {/*/>*/}
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
