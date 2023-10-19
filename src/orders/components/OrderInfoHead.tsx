import { useTranslation } from "react-i18next"
import { Order } from "db"

interface OrderInfoHeadProps {
  order: Order
}

export const OrderInfoHead = (props: OrderInfoHeadProps) => {
  const { order } = props

  const { t } = useTranslation(["pages.orderId"])

  // help={t("form.fields.numPeople.help", { numTicketsLeft: numTicketsLeft })}

  return (
    <section className="max-w-xl">
      <h1 className="text-base font-medium text-indigo-600">{t("head.title")}</h1>
      <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{t("head.subtitle")}</p>
      <p className="mt-2 text-base text-gray-500">{t("head.message", { orderId: order.id })}</p>

      <dl className="mt-12 text-sm font-medium">
        <dt className="text-gray-900">{t("head.info.title")}</dt>
        <dd className="mt-2 text-indigo-600">51547878755545848512</dd>
      </dl>
    </section>
  )
}

export default OrderInfoHead
