import { CurrencyEnum, OrderStatusEnum } from "@prisma/client"
import { useTranslation } from "react-i18next"
import { StripeCheckoutFormWithElements } from "src/core/hooks/useStripe"

import { OrderFull } from "../schemas"
import { usePayment } from "../../core/hooks/usePayment"
import Button from "src/core/tailwind-ui/application-ui/elements/buttons/Button"
interface OrderHeadProps {
  order: OrderFull
  onPayClick?: () => void
}

export const OrderHead = (props: OrderHeadProps) => {
  const { order, onPayClick } = props
  const { t } = useTranslation(["pages.orderId", "translation"])
  const { pay, stripePaymentIntent } = usePayment()

  return (
    <section className="max-w-xl">
      <h1 className="text-base font-medium text-indigo-600">{t("head.title")}</h1>
      <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
        {t("head.subtitle") + " " + t("head.status." + order.status)}
      </p>
      <p className="mt-2 text-base text-gray-500">{t("head.message", { orderId: order.id })}</p>

      <div className={"mt-6"}>
        {!stripePaymentIntent && order.status === OrderStatusEnum.PAYMENT && (
          <Button
            buttonText={t("translation:pay")}
            onClick={async () => {
              await pay(order)
            }}
          />
        )}
        {stripePaymentIntent &&
          order.id &&
          order.invoice &&
          order.invoice.currency === CurrencyEnum.EUR && (
            <StripeCheckoutFormWithElements
              orderId={order.id}
              paymentIntentInstance={stripePaymentIntent}
            />
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
