import React, { useState } from "react"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useTranslation } from "react-i18next"
import queryString from "query-string"
import { CurrencyEnum, Invoice, OrderStatusEnum } from "@prisma/client"
import { z } from "zod"

import { StripeCheckoutFormWithElements } from "src/core/hooks/useStripe"

import { OrderFull } from "../schemas"
import Button from "src/core/tailwind-ui/application-ui/elements/buttons/Button"
import { usePayment } from "src/core/hooks/usePayment"
import { currencyFormat } from "src/core/helpers/Helpers"
import PaymentCurrencyForm from "src/checkout/components/PaymentCurrencyForm"
import { Money } from "src/core/components/Money"
import HeadingBlock from "src/core/tailwind-ui/headings/HeadingBlock"

import createInvoiceForOrder from "src/invoices/mutations/createInvoiceForOrder"
import getFxRate from "src/fx-rates/queries/getFxRate"

interface OrderHeadProps {
  order: OrderFull
  onPayClick?: () => void
}

export const OrderHead = (props: OrderHeadProps) => {
  const { order, onPayClick } = props
  const { t } = useTranslation(["pages.orderId", "translation"])
  const { pay, stripePaymentIntent } = usePayment()
  const [showPayment, setShowPayment] = useState(order.status === OrderStatusEnum.PAYMENT)
  const [invoice, setInvoice] = useState<Invoice>()
  const [createInvoiceMutation] = useMutation(createInvoiceForOrder)
  const [fxRate] = useQuery(getFxRate, { from: "EUR", to: "RUB" })
  const queryParams: {
    payment_intent?: string
    payment_intent_client_secret?: string
    redirect_status?: string
    success?: string
  } = queryString.parse(location.search)

  return (
    <section className="max-w-xl">
      <h1 className="text-base font-medium text-indigo-600">
        {t("head.title")}{" "}
        {queryParams?.success === "1" ? t("head.description.success") : t("head.description.main")}
      </h1>
      <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
        {t("head.subtitle") + " " + t("head.status." + order.status)}
      </p>
      <p className="mt-2 text-base text-gray-500">{t("head.message", { orderId: order.id })}</p>
      <div className={"mt-6"}>
        {!showPayment && order.status === OrderStatusEnum.PAYMENT && (
          <Button
            buttonText={t("translation:pay")}
            onClick={async () => {
              // const invoice = createInvoiceMutation()
              // await pay(order)
              setShowPayment(true)
            }}
          />
        )}
        {showPayment && !stripePaymentIntent && (
          <>
            <PaymentCurrencyForm
              schema={z.object({
                currency: z.enum(["RUB", "EUR"]),
              })}
              amount={{
                RUB: fxRate * order.total,
                EUR: order.total,
              }}
              // submitText={t("translation:next")}
              onSubmit={async (values) => {
                if (!order.id) {
                  return
                }
                let newInvoiceData = {
                  orderId: order.id,
                  currency: values.currency,
                }

                if (typeof newInvoiceData.currency !== "undefined") {
                  const invoiceCreated = await createInvoiceMutation(newInvoiceData)
                  setInvoice(invoiceCreated)

                  await pay(invoiceCreated, order)
                }
              }}
            />
          </>
        )}
        {stripePaymentIntent && order.id && invoice && invoice.currency === CurrencyEnum.EUR && (
          <>
            <h2 className="mb-5 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              {currencyFormat({
                num: invoice.amount,
                currency: invoice.currency,
              })}
            </h2>
            <StripeCheckoutFormWithElements
              orderId={order.id}
              paymentIntentInstance={stripePaymentIntent}
            />
          </>
        )}
      </div>
      {order.shippingTrackingId && (
        <dl className="mt-12 text-sm font-medium">
          <dt className="text-gray-900">{t("head.info.title")}</dt>
          <dd className="mt-2 text-indigo-600">{order.shippingTrackingId}</dd>
        </dl>
      )}
    </section>
  )
}

export default OrderHead
