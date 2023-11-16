import { useTranslation } from "react-i18next"
import { OrderFull } from "../schemas"
import { Money } from "../../core/components/Money"

interface OrderSummaryProps {
  order: OrderFull
}

export const OrderSummary = (props: OrderSummaryProps) => {
  // TODO: получать только данные по price
  const { order } = props
  const { t } = useTranslation(["order"])

  return (
    <>
      <h3 className="sr-only">Summary</h3>

      <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
        <div className="flex justify-between">
          <dt className="font-medium text-gray-900">{t("order:subtotal")}</dt>
          <dd className="text-gray-700">
            <Money amount={order.subtotal} currency={order.currency} />
          </dd>
        </div>
        {/*<div className="flex justify-between">*/}
        {/*  <dt className="flex font-medium text-gray-900">*/}
        {/*    {t("order:discount")}*/}
        {/*    <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">*/}
        {/*      STUDENT50*/}
        {/*    </span>*/}
        {/*  </dt>*/}
        {/*  <dd className="text-gray-700">-$18.00 (50%)</dd>*/}
        {/*</div>*/}
        <div className="flex justify-between">
          <dt className="font-medium text-gray-900">{t("order:shipping")}</dt>
          <dd className="text-gray-700">
            <Money amount={order.shippingFee} currency={order.currency} />
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium text-gray-900">{t("order:total")}</dt>
          <dd className="text-gray-900">
            <Money amount={order.total} currency={order.currency} />
          </dd>
        </div>
      </dl>
    </>
  )
}

export default OrderSummary
