import { useTranslation } from "react-i18next"
import { OrderFull } from "../schemas"

interface OrderAddressesProps {
  order: OrderFull
}

export const OrderAddresses = (props: OrderAddressesProps) => {
  // TODO: получать только адреса
  const { order } = props
  const { t, i18n } = useTranslation(["order"])

  return (
    <>
      {/*<h4 className="sr-only">Addresses</h4>*/}
      <dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">
        {order.shippingAddress && (
          <div>
            <dt className="font-medium text-gray-900">{t("order:address")}</dt>
            <dd className="mt-2 text-gray-700">
              <address className="not-italic">
                <span className="block">
                  {order.shippingAddress?.firstName + " " + order.shippingAddress?.lastName}
                </span>
                <span className="block">{order.shippingAddress?.address}</span>
                <span className="block">
                  {order.shippingAddress?.postalCode + " " + order.shippingAddress?.city}
                </span>
                <span className="block">
                  {i18n.resolvedLanguage === "ru"
                    ? order.shippingAddress?.country.titleRu
                    : order.shippingAddress?.country.titleEn}
                </span>
              </address>
            </dd>
          </div>
        )}
        {/*<div>*/}
        {/*  <dt className="font-medium text-gray-900">Billing address</dt>*/}
        {/*  <dd className="mt-2 text-gray-700">*/}
        {/*    <address className="not-italic">*/}
        {/*      <span className="block">Kristin Watson</span>*/}
        {/*      <span className="block">7363 Cynthia Pass</span>*/}
        {/*      <span className="block">Toronto, ON N3Y 4H8</span>*/}
        {/*    </address>*/}
        {/*  </dd>*/}
        {/*</div>*/}
      </dl>
    </>
  )
}

export default OrderAddresses
