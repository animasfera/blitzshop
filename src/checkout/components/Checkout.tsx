import React, { useState } from "react"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { useTranslation } from "react-i18next"
import { Invoice, ShippingAddress } from "db"
import { PreOrderItem } from "types"

import { CreateOrderType } from "src/orders/schemas"
import { usePayment } from "src/core/hooks/usePayment"
import { cartClient } from "src/core/hooks/useCart"
import { CheckoutOrder } from "src/checkout/components/CheckoutOrder"
import { CheckoutPayment } from "src/checkout/components/CheckoutPayment"
import { CheckoutPaymentFormInputsBlock } from "./CheckoutPaymentFormInputsBlock"
import { ShippingAddressChoiceController } from "./ShippingAddressChoiceController"
import { PaymentCurrencyForm } from "./PaymentCurrencyForm"
import { PaymentController } from "src/checkout/components/PaymentController"

import createOrder from "src/orders/mutations/createOrder"
import createInvoiceForOrder from "src/invoices/mutations/createInvoiceForOrder"

interface CheckoutProps {
  items: any[]
  cartClient: cartClient
}

export const Checkout = (props: CheckoutProps) => {
  const { cartClient } = props

  const { t } = useTranslation(["pages.checkout", "shippingAddress"])
  const router = useRouter()

  const [orderId, setOrderId] = useState<number | undefined>(undefined)
  const [showPayment, setShowPayment] = useState(false)
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
    setOrder({
      ...order,
      shippingFee: value,
      total: order.total + (value ?? 0),
    })
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
          shipping={order.shippingFee}
          subtotal={order.subtotal}
          total={order.total}
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

                  const isCdek =
                    address.countryId === "RU" ||
                    address.countryId === "BY" ||
                    address.countryId === "KZ"

                  const orderCreated = await createOrderMutation(newOrderData as CreateOrderType)

                  setShippingAddress(address)
                  setOrderId(orderCreated.id)

                  if (isCdek) {
                    setShowPayment(true)
                  } else {
                    setShowPayment(false)

                    // const shippingWithPrice = await getShippingMethodWithPriceMutation({
                    //   address,
                    // })
                    // setOrder({
                    //   ...order,
                    //   shippingFee: shippingWithPrice.price,
                    // })

                    router.push(Routes.OrderPage({ orderId: orderCreated.id }))
                  }
                }}
                handleSetOrder={handleSetOrder}
              />
            </>
          </CheckoutPaymentFormInputsBlock>

          {showPayment && orderId && <PaymentController orderId={orderId} />}

          {shippingAddress && order.id && orderId && (
            <CheckoutPaymentFormInputsBlock title={t("pages.checkout:paymentCurrency.title")}>
              <PaymentController orderId={orderId} />
            </CheckoutPaymentFormInputsBlock>
          )}
        </CheckoutPayment>
      </div>
    </div>
  )
}

export default Checkout
