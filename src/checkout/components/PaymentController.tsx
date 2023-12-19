import React, { useState } from "react"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useTranslation } from "react-i18next"
import { z } from "zod"
import { CurrencyEnum, Invoice, OrderStatusEnum } from "db"

import { Loading } from "src/core/components/Loading"
import { PaymentCurrencyForm } from "src/checkout/components/PaymentCurrencyForm"
import { StripeCheckoutFormWithElements } from "src/core/hooks/useStripe"
import { usePayment } from "src/core/hooks/usePayment"
import { currencyFormat } from "src/core/helpers/Helpers"
import { Money } from "src/core/components/Money"
import { Button } from "src/core/tailwind-ui/application-ui/elements/buttons/Button"
import { HeadingBlock } from "src/core/tailwind-ui/headings/HeadingBlock"

import { OrderFull } from "src/orders/schemas"

import createInvoiceForOrder from "src/invoices/mutations/createInvoiceForOrder"
import getFxRate from "src/fx-rates/queries/getFxRate"
import getOrder from "src/orders/queries/getOrder"

interface PaymentControllerProps {
  // order: OrderFull
  orderId?: number
}

export const PaymentController = (props: PaymentControllerProps) => {
  const {
    // order
    orderId,
  } = props

  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [order] = useQuery(getOrder, { id: orderId })
  const [fxRate] = useQuery(getFxRate, { from: "EUR", to: "RUB" })
  const [createInvoiceMutation] = useMutation(createInvoiceForOrder)

  if (invoice) console.log("PaymentController invoiceCreated", invoice)

  return (
    <Loading>
      <section className="max-w-xl">
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
              // setInvoice(invoiceCreated)
              // @ts-ignore
              // await pay(invoiceCreated, order)
            }
          }}
        />

        {/* stripePaymentIntent &&  */}
        {order.id && invoice && invoice.currency === CurrencyEnum.EUR && (
          <>
            <h2 className="my-5 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              <Money amount={invoice.amount} currency={invoice.currency} />
            </h2>

            <StripeCheckoutFormWithElements
              orderId={order.id}
              // paymentIntentInstance={stripePaymentIntent}
              paymentIntentInstance={null}
            />
          </>
        )}
      </section>
    </Loading>
  )
}

export default PaymentController
