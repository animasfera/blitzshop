import React, { ReactElement } from "react"
import { useTranslation } from "react-i18next"

import { Money } from "src/core/components/Money"
import { cartClient } from "src/core/hooks/useCart"

interface CheckoutOrderInfoProps {
  cart: cartClient
  children: ReactElement | ReactElement[]
  subtotal: number
  shipping?: number
  total: number
}

export const CheckoutOrderInfo = (props: CheckoutOrderInfoProps) => {
  const { cart, children, total, subtotal, shipping } = props

  const { t } = useTranslation(["pages.checkout"])

  return (
    <>
      <dl>
        <dt className="text-sm font-medium">{t("order.amount")}</dt>
        <dd className="mt-1 text-3xl font-bold tracking-tight text-white">
          <Money amount={total} currency={"EUR"} />
        </dd>
      </dl>

      {children}

      <dl className="space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium">
        <div className="flex items-center justify-between">
          <dt>{t("order.subtotal")}</dt>
          <dd>
            <Money
              // $570.00
              amount={subtotal}
              currency={"EUR"}
            />
          </dd>
        </div>

        <div className="flex items-center justify-between">
          <dt>{t("order.shipping")}</dt>
          <dd>
            {shipping ? (
              <Money
                // $25.00
                amount={shipping}
                currency={"EUR"}
              />
            ) : (
              "?"
            )}
          </dd>
        </div>
        */}

        {/*<div className="flex items-center justify-between">*/}
        {/*  <dt>{t("order.taxes")}</dt>*/}
        {/*  <dd>*/}
        {/*    <Money*/}
        {/*      // $47.60*/}
        {/*      amount={4760}*/}
        {/*      currency={"USD"}*/}
        {/*    />*/}
        {/*  </dd>*/}
        {/*</div>*/}

        <div className="flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-white">
          <dt className="text-base">{t("order.total")}</dt>
          <dd className="text-base">
            <Money
              // $642.60
              amount={total}
              currency={"EUR"}
            />
          </dd>
        </div>
        */}
      </dl>
    </>
  )
}

export default CheckoutOrderInfo
