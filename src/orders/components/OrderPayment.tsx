import { OrderFull } from "../schemas"
import { useTranslation } from "react-i18next"
import { DeliveryMethodEnum } from "@prisma/client"

interface OrderPaymentProps {
  order: OrderFull
}

export const OrderPayment = (props: OrderPaymentProps) => {
  // TODO: получать только данные по платежу
  const { order } = props
  const { t, i18n } = useTranslation(["order"])

  return (
    <>
      {/*<h4 className="sr-only">Payment</h4>*/}
      <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-10 text-sm">
        {/*<div>*/}
        {/*  <dt className="font-medium text-gray-900">{t("order:payment")}</dt>*/}
        {/*  <dd className="mt-2 text-gray-700">*/}
        {/*    <p>Apple Pay</p>*/}
        {/*    <p>Mastercard</p>*/}
        {/*    <p>*/}
        {/*      <span aria-hidden="true">••••</span>*/}
        {/*      <span className="sr-only">Ending in </span>1545*/}
        {/*    </p>*/}
        {/*  </dd>*/}
        {/*</div>*/}
        <div>
          <dt className="font-medium text-gray-900">{t("order:shippingMethod")}</dt>
          <dd className="mt-2 text-gray-700">
            <p>{t("order:shippingCompanies." + order.shippingCompany)}</p>
            <p>{t("order:deliveryMethods." + order.shippingAddress?.deliveryMethod)}</p>
          </dd>
        </div>
      </dl>
    </>
  )
}

export default OrderPayment
